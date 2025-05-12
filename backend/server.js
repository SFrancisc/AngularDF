const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("API Key is missing!");
  process.exit(1);
}

// Configurare conexiune PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// Încarcă istoricul conversației din baza de date
async function loadHistory() {
  const result = await pool.query('SELECT role, content FROM chat_history ORDER BY created_at ASC');
  return result.rows;
}

// Salvează mesajele în baza de date
async function saveMessages(messages) {
  const insertPromises = messages.map(({ role, content }) =>
    pool.query('INSERT INTO chat_history (role, content) VALUES ($1, $2)', [role, content])
  );
  await Promise.all(insertPromises);
}

// Endpoint pentru chat
app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Mesaje primite de la frontend:', messages);

  try {
    const conversation = [
      { role: 'system', content: 'Ești un asistent prietenos și inteligent. Răspunde clar și concis.' },
      ...messages
    ];

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: conversation,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const assistantReply = response.data.choices[0].message.content;
    console.log('Răspuns de la OpenAI:', assistantReply);

    messages.push({ role: 'assistant', content: assistantReply });

    res.json(response.data); // Răspunsul este trimis înapoi la frontend
    await saveMessages([{ role: 'user', content: messages.at(-2).content }, { role: 'assistant', content: assistantReply }]);

  } catch (error) {
    console.error('Eroare la procesarea cererii:', error.response?.data || error.message);
    res.status(500).send('Eroare la procesarea cererii.');
  }
});

// Endpoint pentru resetare
app.post('/reset', async (req, res) => {
  try {
    await pool.query('DELETE FROM chat_history');
    res.json({ success: true, message: "Istoricul conversației a fost resetat." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Eroare la resetare." });
  }
});

// Endpoint pentru a returna istoricul conversației
app.get('/get-history', async (req, res) => {
  try {
    const history = await loadHistory();
    res.json({ messages: history });
  } catch (err) {
    res.status(500).json({ error: "Eroare la preluarea istoricului." });
  }
});

// Pornește serverul
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});

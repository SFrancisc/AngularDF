import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectieCeramicaComponent } from './protectie-ceramica.component';

describe('ProtectieCeramicaComponent', () => {
  let component: ProtectieCeramicaComponent;
  let fixture: ComponentFixture<ProtectieCeramicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectieCeramicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectieCeramicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

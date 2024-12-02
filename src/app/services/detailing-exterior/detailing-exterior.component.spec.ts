import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailingExteriorComponent } from './detailing-exterior.component';

describe('DetailingExteriorComponent', () => {
  let component: DetailingExteriorComponent;
  let fixture: ComponentFixture<DetailingExteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailingExteriorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailingExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

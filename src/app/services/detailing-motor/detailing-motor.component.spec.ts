import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailingMotorComponent } from './detailing-motor.component';

describe('DetailingMotorComponent', () => {
  let component: DetailingMotorComponent;
  let fixture: ComponentFixture<DetailingMotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailingMotorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailingMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

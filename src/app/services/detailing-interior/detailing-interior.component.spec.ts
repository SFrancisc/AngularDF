import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailingInteriorComponent } from './detailing-interior.component';

describe('DetailingInteriorComponent', () => {
  let component: DetailingInteriorComponent;
  let fixture: ComponentFixture<DetailingInteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailingInteriorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailingInteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

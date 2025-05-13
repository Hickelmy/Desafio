import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorOfTheMonthComponent } from './doctor-of-the-month.component';

describe('DoctorOfTheMonthComponent', () => {
  let component: DoctorOfTheMonthComponent;
  let fixture: ComponentFixture<DoctorOfTheMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorOfTheMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

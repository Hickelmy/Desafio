import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayVisitsComponent } from './today-visits.component';

describe('TodayVisitsComponent', () => {
  let component: TodayVisitsComponent;
  let fixture: ComponentFixture<TodayVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

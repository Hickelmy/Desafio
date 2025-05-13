import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPieChartComponent } from './division-pie-chart.component';

describe('DivisionPieChartComponent', () => {
  let component: DivisionPieChartComponent;
  let fixture: ComponentFixture<DivisionPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

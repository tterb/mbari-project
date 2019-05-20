import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiveLogChartComponent } from './dive-log-chart.component';

describe('DiveLogChartComponent', () => {
  let component: DiveLogChartComponent;
  let fixture: ComponentFixture<DiveLogChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiveLogChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiveLogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

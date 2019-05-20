import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiverChartComponent } from './diver-chart.component';

describe('DiverChartComponent', () => {
  let component: DiverChartComponent;
  let fixture: ComponentFixture<DiverChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiverChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiverChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

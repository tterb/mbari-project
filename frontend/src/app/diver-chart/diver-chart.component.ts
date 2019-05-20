import { Component, OnInit } from '@angular/core';
import {APIService} from '../api.service';
import {scaleBand, scaleLinear, scalePoint, scaleTime} from 'd3-scale';
import {area, curveLinear, line} from 'd3-shape';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-diver-chart',
  templateUrl: './diver-chart.component.html',
  styleUrls: ['./diver-chart.component.scss']
})
export class DiverChartComponent implements OnInit {
  chartData: any[];
  // chart stuff
  canShow: boolean;
  showLegend = true;
  gradient = false;
  view = [600, 350];
  animations = true;
  timeline = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xLabel: String = "Month";
  yLabel: String = "Dives"
  colorScheme = {
    domain: ['#F5BB42', '#5AA454', '#A10A28', , '#AAAAAA']
  };
  constructor(private APIService: APIService) { }

  ngOnInit() {
    this.chartData = [];
    this.chartData.push(  {
      "name": "Diver1",
      "series": [
        {
          "value": 20,
          "name": "2019-01"
        },
        {
          "value": 15,
          "name": "2019-02"
        },
        {
          "value": 25,
          "name": "2019-03"
        },
        {
          "value": 22,
          "name": "2019-04"
        },
        {
          "value": 6,
          "name": "2019-05"
        }
      ]
    })
    this.chartData.push(  {
      "name": "Diver2",
      "series": [
        {
          "value": 15,
          "name": "2019-01"
        },
        {
          "value": 25,
          "name": "2019-02"
        },
        {
          "value": 22,
          "name": "2019-03"
        },
        {
          "value": 6,
          "name": "2019-04"
        },
        {
          "value": 20,
          "name": "2019-05"
        },
      ]
    })
    this.canShow = true;
  }

}

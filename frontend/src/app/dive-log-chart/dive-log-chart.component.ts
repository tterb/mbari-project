import { Component, OnInit } from '@angular/core';
import {APIService} from '../api.service';
import {BarHorizontalStackedComponent, NgxChartsModule} from '@swimlane/ngx-charts';
import {PieSeriesComponent} from "@swimlane/ngx-charts";
import {PieChartComponent} from "@swimlane/ngx-charts";
import {calculateViewDimensions, ColorHelper, ViewDimensions } from '@swimlane/ngx-charts';
import {scaleBand, scaleLinear, scalePoint, scaleTime} from 'd3-scale';
import {area, curveLinear, line} from 'd3-shape';
import { BaseChartComponent } from '@swimlane/ngx-charts';
import {forEach} from '@angular/router/src/utils/collection';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-dive-log-chart',
  templateUrl: './dive-log-chart.component.html',
  styleUrls: ['./dive-log-chart.component.scss']
})
export class DiveLogChartComponent implements OnInit {
  siteCount: any[];
  chartData: any[];
  sites: Array<string>;
  // chart stuff
  showChart: boolean;
  gradient = false;
  view = [600, 200];
  animations = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#F5BB42', '#AAAAAA']
  };


  constructor(private APIService: APIService) { }

  ngOnInit() {
    this.siteCount = [];
    this.showChart = false;
    this.chartData = [];
    this.getSites();
    this.APIService.getAllDives().subscribe( dives => {
      this.processDiveData(dives);
    });
  }

  /**
   * Populates the various data for chart display on dashboard.
   * @param dives
   */
  processDiveData(dives) {
    this.sites.forEach(site => {
      this.siteCount[site] = 0;
    });
    dives.forEach( dive => {
      // populate array for counts
      this.siteCount[dive.site.name]++;
    });
    for (var key in this.siteCount) {
      this.chartData.push({
        name: key,
        value: this.siteCount[key]
      });
    }
    this.showChart = true;
  }

  /**
   * Returns all dive sites for use in other methods.
   */
  getSites() {
    this.APIService.getAllSites().subscribe(
      data => {
        if(data !== null) {
          this.sites = data;
        }
      }
    );
  }
}

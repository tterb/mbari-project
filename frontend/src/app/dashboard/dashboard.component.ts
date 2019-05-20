import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  divers: Array<string>;

  constructor(
    private titleService: TitleService,
    private api: APIService,
  ) { }

  ngOnInit() {
    // Set the title of the page in the browser
    this.titleService.setTitle("Dashboard");
    this.getDivers();
  }

  /**
   * Retrieves all divers from the backend.
   */
  getDivers() {
    this.api.getAllDivers().subscribe(
      data => {
        if(data !== null) {
          this.divers = data;
        }
      }
    );
  }

}

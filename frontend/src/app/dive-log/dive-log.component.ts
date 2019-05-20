import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { APIService } from '../api.service';
import { Log } from '../log';

@Component({
  selector: 'app-dive-log',
  templateUrl: './dive-log.component.html',
  styleUrls: ['./dive-log.component.scss']
})
export class DiveLogComponent implements OnInit {

  activeDiver: string = 'all';
  divers: Array<string>;
  logs: Array<Log>;

  constructor(
    private titleService: TitleService,
    private api: APIService,
  ) { }

  ngOnInit() {
    // Set the title of the page in the browser
    this.titleService.setTitle('Dive Log');
    this.getDivers();
    this.updateLogs(this.activeDiver);
  }

  /**
   * Updates the log array depending on what diver is selected.
   * @param diver the diver for which the logs are being updated
   */
  updateLogs(diver: string) {
    this.activeDiver = diver;
    if (this.activeDiver === 'all') {
      this.getAllLogs(); // if all dives are requested, just gets all logs.
    } else {
      this.getDiverLogs(); // otherwise, it gets the logs from the active diver
    }
  }

  /**
   * Adds a log to be displayed. Sets its data accordingly then pushes it to the array.
   * Note that every log to be displayed must be added to the 'logs' array.
   */
  setLogData() {
    let logs = [];
    this.logs.forEach((log) => {
      var date = new Date(log.timeIn);
      log.date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      log.time = date.toLocaleTimeString();
      log.duration = Math.round((+(new Date(log.timeOut)) - +(date)) / 60000);
      logs.push(log);
    });
    return logs;
  }

  /**
   * Returns a list of all divers currently in the backend database.
   */
  getDivers() {
    this.api.getAllDivers().subscribe(
      data => {
        if (data !== null) {
          this.divers = data;
        }
      }
    );
  }

  /**
   * Sets all dive logs do the logs array so they can be displayed.
   */
  getAllLogs() {
    this.api.getAllDives().subscribe(
      data => {
        this.logs = (data !== null) ? data : this.logs;
        this.logs = this.setLogData();
      }
    );
  }

  /**
   * Sets logs for the currently selected diver to the logs array so they can be displayed.
   */
  getDiverLogs() {
    this.api.getDiverLogs(this.activeDiver).subscribe(
      data => {
        this.logs = (data !== null) ? data : this.logs;
        this.logs = this.setLogData();
      }
    );
  }

  /**
   * Deletes the indicated dive log.
   * @param log the log to be deleted.
   */
  deleteLog(log: Log) {
    this.api.deleteDiveLog(log).subscribe(
      data => {
        if (data !== null) {
          this.updateLogs(this.activeDiver);
        }
      }
    );
  }

}

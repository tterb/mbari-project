import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public alertService: AlertService = AlertService;
  public constructor(){}
}

import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private titleService: TitleService) { }

  ngOnInit() {
    // Set the title of the page in the browser
    this.titleService.setTitle("Home");
  }

  public exampleError(){
    AlertService.newMessage('Hi! This is an example of a brief error message.', true);
  }

  public exampleSuccess(){
    AlertService.newMessage('Hello! This is an example of a "success" message. It may wrap because it is intentionally a bit long.', false);
  }
}

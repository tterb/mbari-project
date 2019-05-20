import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-add-dive',
  templateUrl: './add-dive.component.html',
  styleUrls: ['./add-dive.component.scss'],
})
export class AddDiveComponent implements OnInit {

    diveForm: FormGroup;
    submitted = false;
    success = false;
    invalid = false;
    return: string = '';
    divers;
    sites;
    dive$: Object;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private api: APIService,
      private titleService: TitleService
    ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Dive');
    this.getDivers(); // retrieves a list of all divers
    this.getSites(); // retrieves a list of all dive sites
    this.diveForm = this.formBuilder.group({
      diver: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    console.log('Sites: ' + this.sites);
    console.log('Divers: ' + this.divers);
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/dive-log');
  }

  /**
   * Passes the dive information to the backend.
   */
  onSubmit() {
    this.submitted = true;
    let diver = this.diveForm.get('diver').value;
    let location = this.diveForm.get('location').value;
    let startTime = new Date(this.diveForm.get('startTime').value + '');
    let endTime = new Date(this.diveForm.get('endTime').value + '');

    this.logDive(diver, location, startTime, endTime); // formatting of startTime & endTime is handled on the backend.
    if (this.diveForm.invalid) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.success = true;
  }

  /**
   * Retrieves all divers from the backend.
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
   * Retrieves all dive sites from the backend.
   */
  getSites() {
    this.api.getAllSites().subscribe(
      data => {
        if (data !== null) {
          this.sites = data;
        }
      }
    );
  }

  /**
   * Sends dive information to the backend.
   * @param name the name of the diver
   * @param location the name of the site for the dive
   * @param startTime beginning time of the dive
   * @param endTime ending time of the dive
   */
  logDive(name, location, startTime, endTime) {
    this.api.addDiveLog(name, location, startTime, endTime).subscribe(
      data => {
        console.log(data);
        if (data !== null) {
          this.dive$ = data;
          this.success = true;
          this.invalid = false;
          this.router.navigateByUrl(this.return);
        } else {
          this.invalid = true;
          this.success = false;
        }
      }
    );
  }

}

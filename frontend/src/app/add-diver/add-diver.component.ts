import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';
import { APIService } from '../api.service';
// import { AuthenticationService } from '../authentication.service';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-add-diver',
  templateUrl: './add-diver.component.html',
  styleUrls: ['./add-diver.component.scss']
})
export class AddDiverComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  invalid = false;
  return: string = '';
  user$: Object;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: APIService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Add Diver');
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/dashboard');
  }

  /**
   * Sends information to add a diver/user to the backend.
   */
  onSubmit() {
    this.submitted = true;
    let name = this.messageForm.get('name').value;
    this.createUser(name);
    if (this.messageForm.invalid) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.success = true;
  }

  /**
   *
   * @param name name of the user to be created
   */
  createUser(name: string) {
    this.api.addDiver(name).subscribe(
      data => {
        if (data !== null) {
          this.user$ = data;
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


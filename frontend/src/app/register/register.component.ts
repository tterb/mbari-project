import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  showLogin = true;
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
    this.titleService.setTitle("Register");
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/login');
  }

  /**
   * Retrieves inputted data and sends to the registerUser function for processing.
   */
  onSubmit() {
    this.submitted = true;
    let name = this.messageForm.get('name').value;
    let username = this.messageForm.get('username').value;
    let password = this.messageForm.get('password').value;
    let confirmPass = this.messageForm.get('confirmPassword').value;

    this.registerUser(name, username, password);
    this.router.navigateByUrl(this.return);
    if(this.messageForm.invalid || password !== confirmPass) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.success = true;
  }

  /**
   * Registers a user given a name, username, and password.
   * @param name the full name of the user
   * @param username the username to be used to login
   * @param password the user's desired password
   */
  registerUser(name: string, username: string, password: string) {
    this.api.register(name, username, password).subscribe(
      data => {
        if(data) {
          this.user$ = data;
          this.invalid = false;
          this.router.navigateByUrl(this.return);
        } else {
          this.invalid = true;
        }
      }
    );
  }
}

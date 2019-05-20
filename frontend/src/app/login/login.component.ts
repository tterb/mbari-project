import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { TitleService } from '../title.service';
import { APIService } from '../api.service'
// import { AuthenticationService } from '../authentication.service'
// import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageForm: FormGroup
  submitted = false
  success = false
  invalid = false
  return: string = ''
  user$: Object

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: APIService,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Login");
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/dashboard')
  }

  /**
   * Called when the login form is submitted
   */
  onSubmit() {
    this.submitted = true
    let username = this.messageForm.get('username').value
    let password = this.messageForm.get('password').value

    this.loginUser(username, password)
    if(this.messageForm.invalid) {
      this.invalid = true
      return
    }
    this.invalid = false
    this.success = true
  }

  /**
   * Takes username and password and uses API service to make call to backend API.
   * @param username
   * @param password
   */
  loginUser(username: string, password: string) {
    this.api.login(username, password).subscribe( // making the API call
      data => {
        if(data !== null) {
          this.user$ = data
          this.success = true
          this.invalid = false
          this.router.navigateByUrl(this.return)
        } else {
          this.invalid = true // in case this fails, sets the invalid and success flags appropriately
          this.success = false
        }
      }
    )
  }

}

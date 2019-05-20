import { Injectable } from '@angular/core';

import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private api: APIService) { }

  authenticate(username, password) {
    let user
    this.api.login(username, password).subscribe(
      data => {
        console.log('data')
        console.log(data)
        user = data
      }
    )
    if(user) {
      sessionStorage.setItem('username', username)
      return true;
      // this.user$ = data
      // this.invalid = false
      // this.userService.setToken(data)
      // this.router.navigateByUrl('/dashboard');
      // this.router.navigateByUrl(this.return);
    } else {
      return false;
      // this.invalid = true
      // this.messageForm.get('username').invalid
      // this.messageForm.get('password').invalid
    }
    // if (username === "javainuse" && password === "password") {
    //   sessionStorage.setItem('username', username)
    //   return true;
    // } else {
    //   return false;
    // }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
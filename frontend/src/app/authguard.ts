import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state'

import { UserService } from './user.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url']
    if (this.userService.isLogged()) {
      return true
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      })
      return false
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            // redirectUrl
            return: redirectUrl
          }
        }
      )
    )
    return false
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private user: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthorized(state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthorized(state);
  }

  private isAuthorized(state): boolean {
    let status = false;
    this.user = this.usersService.isAuthenticated().user;

    if (this.user) {
      if (this.user.profile.routes.length > 0) {
        this.user.profile.routes.forEach(element => {
          if (element !== null &&
              element !== undefined &&
              element.url !== null &&
              element.url !== undefined &&
              element.url === state.url
          ) {
            status = true;
            return false;
          }
        });
      }
    }

    return status;
  }
}

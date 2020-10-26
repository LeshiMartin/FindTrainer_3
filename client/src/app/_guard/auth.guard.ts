import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { _login_route } from '../_data/_route';
import { Role } from '../_model/_Enum/Role';
import { AuthService } from '../_services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private AuthS: AuthService) {}

  canActivate() {
    return this.AuthS.checkIfRole(Role.user);
  }
}

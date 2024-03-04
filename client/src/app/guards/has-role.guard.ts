import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const hasRoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(LoginService).isLoggedIn();
  const rol = inject(LoginService).userRoles;

  if (auth) {
    const allowedRoles = route.data['roles'] as string[];
    console.log('ALLOWED', allowedRoles);
    console.log('AUTH', auth);
    console.log('ROLE', rol);
    
    
  }
  return true;
};

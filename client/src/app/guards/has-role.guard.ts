import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const hasRoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(LoginService).isLoggedIn();
  const rol = inject(LoginService).userRoles;
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  if (auth && allowedRoles.includes(rol)) {
    return true;
  } else {
    router.navigate([`/not-allowed`]);
    return false;
  }
};

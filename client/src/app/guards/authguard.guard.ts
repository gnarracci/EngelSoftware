import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authy = inject(LoginService).isLoggedIn();
  const router = inject(Router);

  if (!authy) {
    return router.navigate(['/login']).then(() => false);
  }
  return true;
};

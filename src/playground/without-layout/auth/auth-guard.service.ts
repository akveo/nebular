import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(NbAuthService),
    router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap((authenticated) => {
      if (!authenticated) router.navigate(['auth/login']);
    }),
  );
};

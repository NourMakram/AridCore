import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../Services/token-service.service';
import { map } from 'rxjs';

export const memberGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenServiceService);
  const router = inject(Router);

  return tokenService.IsAuthentication.pipe(
    map((value) => {
      if (value) {
        let roleName = tokenService.GetRole();
        if (roleName === 'Member') {
          return true;
        } else {
          router.navigateByUrl('/NotAllowd');
          return false;
        }
      } else {
        router.navigateByUrl('/Login'); // إذا كان غير مسجل الدخول
        return false;
      }
    })
  );
};

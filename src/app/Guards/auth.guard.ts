import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../Services/token-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const TokenService = inject(TokenServiceService);
  const router =inject(Router);
TokenService.IsAuthentication.subscribe(
  (value)=>{
    if(value){
      let roleName =TokenService.GetRole();
      if(roleName == "Admin"){
       router.navigateByUrl('/userPage');
      }
      else if(roleName == "Member"){
        router.navigateByUrl('/clientPage');

      }
      else{
         router.navigateByUrl('/not-found');

      }
    }
  }
)

  return true;
};

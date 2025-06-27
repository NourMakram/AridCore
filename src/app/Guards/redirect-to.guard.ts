import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../Services/token-service.service';

export const redirectToGuard: CanActivateFn = (route, state) => {
  const authservice = inject(TokenServiceService);
  const router =inject(Router);
  let redirectTo = "";
  let Role = authservice.GetRole();
     if(Role!=null&&Role == "Member"){
    redirectTo="/clientPage"
 
   }
   else if(Role!=null&&Role == "Admin"){
    redirectTo="/userPage"

   }
   return redirectTo=="" ?true : router.navigateByUrl(redirectTo);
};

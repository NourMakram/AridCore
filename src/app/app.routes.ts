import { Routes } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DALComponent } from './Components/dal/dal.component';
import { EmailConifrmComponent } from './Components/email-conifrm/email-conifrm.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { LoginByDALComponent } from './Components/login-by-dal/login-by-dal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterAccountForOthersComponent } from './Components/register-account-for-others/register-account-for-others.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { UnAuhtorizeComponent } from './Components/un-auhtorize/un-auhtorize.component';
import { adminGuard } from './Guards/admin.guard';
import { memberGuard } from './Guards/member.guard';

 
export const routes: Routes = [

  { path: 'Login', component: LoginComponent , canActivate:[authGuard]  },  
  { path: 'Register', component: RegisterComponent },  
  { path:'Register/:id', component: RegisterAccountForOthersComponent },  
  {path:"DAL",component:DALComponent} ,
  {path:"DAL/:dal",component:LoginByDALComponent} ,
  { path: 'forgetPassword', component: ForgetPasswordComponent },  
  { path: 'EmailConifrm/:Email', component: EmailConifrmComponent },  
  { path: 'resetPassword/:Email', component: ResetPasswordComponent },  
    { path: 'NotAllowd', component: UnAuhtorizeComponent },  

  { path: '', redirectTo: 'Login', pathMatch: 'full' } ,
  { path: 'userPage', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule),canActivate:[adminGuard] },
  { path: 'clientPage', loadChildren: () => import('./client-pages/client-pages.module').then(m => m.ClientPagesModule) ,canActivate:[memberGuard]},
  {path:"not-found",component:NotFoundComponent},
 {path: '**', redirectTo: 'not-found', pathMatch: 'full' }, // Wildcard route (for unknown paths)


];

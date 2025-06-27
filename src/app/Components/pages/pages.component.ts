import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { TokenServiceService } from '../../Services/token-service.service';
import { UserModel } from '../../Models/UserModel';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
 import { NavbarComponent } from '../../client-pages/navbar/navbar.component';

@Component({
  selector: 'app-pages',
  imports:[RouterOutlet,RouterLink,RouterLinkActive],
  standalone:true,
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
IsAuthenticated$;
constructor(private TokenService:TokenServiceService,private authService:AuthService
  
){
  this.IsAuthenticated$ = this.TokenService.IsAuthentication;

  let userId = this.TokenService.GetUserId();
  if(userId!= undefined){
      this.GetUser(userId);

  }
}

//==============================================================================
Logout(){
  this.authService.OnLogout();
}

//==============================================================================
User:UserModel = {} as UserModel;
GetUser(userId:string){
  this.authService.GetUser(userId).subscribe({
    next:(value)=>{
      this.User = value;
    }
    ,
    error:(error)=>{
      console.log(error)
    }
  })
}
}

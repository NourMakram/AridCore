import { Component } from '@angular/core';
import { UserModel } from '../../Models/UserModel';
import { AuthService } from '../../Services/auth.service';
import { CityService } from '../../Services/city.service';
import { CountryService } from '../../Services/country.service';
import { TokenServiceService } from '../../Services/token-service.service';
import { UniversityService } from '../../Services/university.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificationComponent } from '../../Components/notification/notification.component';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[RouterLink,CommonModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
IsAuthenticated$;
userId:any;
constructor(private TokenService:TokenServiceService,private authService:AuthService,
  private Router:Router,private dialog:MatDialog,private nofticationService:NotificationService
){
  this.IsAuthenticated$ = this.TokenService.IsAuthentication;

  this.userId = this.TokenService.GetUserId();
  if(this.userId!=null){
      this.GetUser(this.userId);

  }


}
//==============================================================================
Logout(){
  this.authService.OnLogout();
}

//=============================================================================
GetProfile(){
  if(this.userId!=undefined){
    this.Router.navigateByUrl(`clientPage/Profile/${this.userId}`)
  }
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
//=================================================================================================
 openNotifyDialog(){
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '560px',
      data: {  }
    });
  dialogRef.afterClosed().subscribe(result => {

  });
}
//=====================================================================================================
UnreadNotification:number=0;
GetUnReadNotification(userId:string){
  this.nofticationService.GetNotificationCount(userId).subscribe({
next:(value)=>{
  this.UnreadNotification = value.noticationCount;
}
});
}

}

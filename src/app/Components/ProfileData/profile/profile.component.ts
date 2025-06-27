import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserModel, userModel2 } from '../../../Models/UserModel';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FollowersComponent } from '../followers/followers.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserBadgesDialogComponent } from '../user-badges-dialog/user-badges-dialog.component';
import { UserManagmentService } from '../../../Services/user-managment.service';
import Swal from 'sweetalert2';
import { FollowService } from '../../../Services/follow.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,MatDialogModule,RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userId:any;
  CurrentUserId:string|null =null;
constructor(private TokenService:TokenServiceService,private authService:AuthService,
  private Router:Router,private activeRouter:ActivatedRoute,
  private userMangmentService:UserManagmentService,private followService:FollowService,
  private dialog:MatDialog
){
 
  this.CurrentUserId = this.TokenService.GetUserId();
  


}
//================================================================================================
  openFollowerDialog(userId:string,type:number) {
    const dialogRef = this.dialog.open(FollowersComponent, {
      width: '350px',
      data: { userId: userId , type:type}
    });
     
  }
//================================================================================================
  openBadgesDialog(userId:string) {
    const dialogRef = this.dialog.open(UserBadgesDialogComponent, {
      width: '350px',
      data: { userId: userId}
    });
     
  }
//==============================================================================
  ngOnInit(): void {
  this.activeRouter.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId != 0) {
        this.GetUser(this.userId);
        if(this.CurrentUserId != undefined){

          this.isFollowFirend(this.CurrentUserId,this.userId);

        }

      }

    });
  
  }
//==============================================================================
User:userModel2 = {} as userModel2;
GetUser(userId:string){
  this.authService.GetUserInfo(userId).subscribe({
    next:(value)=>{
      this.User = value;
    }
    ,
    error:(error)=>{
      console.log(error)
    }
  })
}
//==============================================================================
DeleteAccount(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn text-white px-3 mx-2 ",
        cancelButton: "btn text-white px-3 mx-2 btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "هل انت متأكد من حذف الحساب ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
     confirmButtonColor:"#28ACDB",
      cancelButtonText: "لا",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
          if(this.CurrentUserId!=undefined){

        this.userMangmentService.Delete(this.CurrentUserId).subscribe({
          next:()=>{
            swalWithBootstrapButtons.fire({
              title: "تم حذف البيانات بنجاح",
               icon: "success",
               showConfirmButton:false,
               timer:2000
            });
            this.authService.OnLogout();

          },
          error:(error)=>{
            swalWithBootstrapButtons.fire({
              title: "فشل حذف هذه البيانات",
               icon: "error",
               showConfirmButton:false,
               timer:2000
            });
          }
        })
      }
    }
  }
         );
      // } else if (
      //   /* Read more about handling dismissals below */
      //   result.dismiss === Swal.DismissReason.cancel
      // ) {
      //   swalWithBootstrapButtons.fire({
      //     title: "تم الغاء الحذف",
      //      icon: "error",
      //      showConfirmButton:false,
      //      timer:2000
      //   });
      // }
   
 
        
     
  }


  //===========================================================================================
  isFollow:boolean = false;
  isFollowFirend(CurrentUserId:string,anotherUserId:string){
    this.followService.isFirend(CurrentUserId,anotherUserId).subscribe({
      next:(value)=>{
        if(value.result == true){
          this.isFollow = true;
           if(this.CurrentUserId != undefined){
          this.isFollowFirend(this.CurrentUserId,this.userId);

        }

        }
        else{
          this.isFollow = false;
        }
      }
    })
  }
  
 
//===================================================================================================
Unfollow(userId:string){
  if(this.isFollow == true){
 if(this.CurrentUserId != undefined){
     this.followService.Delete(this.CurrentUserId,userId).subscribe({
        next:(value)=>{
 if(this.CurrentUserId != undefined){
          this.isFollowFirend(this.CurrentUserId,this.userId);

        }
        },
        error:(error)=>{
          console.log(error);
        }
      })
  }
 
}
}
  //=============================================================================================
 Follow(userId:String){
  if(this.isFollow == false){
    if(this.CurrentUserId != undefined && userId != undefined){
     this.followService.follow({userId: this.CurrentUserId,followedUserId: userId}).subscribe({
        next:(value)=>{
 if(this.CurrentUserId != undefined){
          this.isFollowFirend(this.CurrentUserId,this.userId);

        }
        },
        error:(error)=>{
          console.log(error);
        }
      })
  }
  }

}
  

}

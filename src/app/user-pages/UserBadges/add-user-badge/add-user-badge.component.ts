import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadgesService } from '../../../Services/badges.service';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { Badge } from '../../../Models/Badge';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { GenaricModel } from '../../../Models/GenaricModel';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-badge',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './add-user-badge.component.html',
  styleUrl: './add-user-badge.component.css'
})
export class AddUserBadgeComponent {
UserBadgesForm:FormGroup;
constructor(private fb:FormBuilder,private badgeService:BadgesService,
 private userBadgeService:UserBadgeService,private userManagmentService:UserManagmentService,
private Router:Router
){
  this.UserBadgesForm = this.fb.group({
    // userIds:this.fb.array(['']),
    userIds:['',Validators.required],
    badgeId: ['',Validators.required]
  });

  this.GetBadges();
  this.GetUsers();
}
//======================================================================================
Badges:Badge[]=[];
GetBadges(){
  this.badgeService.GetAllList().subscribe({
    next:(value)=>{
      this.Badges = value;
    }
  });

}
//======================================================================================

//========================================================================================
Users:GenaricModel[] =[]
GetUsers(){
    this.userManagmentService.GetUsersList(1, 50,"").subscribe({
      next: (value) => {
        // console.log(value);
        this.Users = value.data;
         
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  //=============================================================================
  Submit(){
    if (this.UserBadgesForm.valid) {
         this.userBadgeService.Create(this.UserBadgesForm?.value).subscribe({
           next: () => {
             console.log("Success To Add");
             this.Router.navigateByUrl("userPage/UserBadges");
           },
           error: (error) => {
             console.log(error);
           }
         })
       }
       else {
         Object.keys(this.UserBadgesForm.controls).forEach(field => {
           const control = this.UserBadgesForm.controls[field];
           control.markAsTouched({ onlySelf: true });
         });
       }
   
 }

}

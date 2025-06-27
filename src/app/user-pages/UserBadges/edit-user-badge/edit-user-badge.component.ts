import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Badge } from '../../../Models/Badge';
import { GenaricModel } from '../../../Models/GenaricModel';
import { BadgesService } from '../../../Services/badges.service';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-badge',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './edit-user-badge.component.html',
  styleUrl: './edit-user-badge.component.css'
})
export class EditUserBadgeComponent {
UserBadgesForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private badgeService:BadgesService,
 private userBadgeService:UserBadgeService,private userManagmentService:UserManagmentService,
private Router:Router,private activeRouter:ActivatedRoute
){
  this.UserBadgesForm = this.fb.group({
  id: ['',Validators.required],
  userId: ['',Validators.required],
  badgeId: ['',Validators.required],
  isGranted: ['',Validators.required],
  isVisible: ['',Validators.required],
  disabled: ['',Validators.required],
  isRejected: ['',Validators.required],
  rejectReason:['']
  });

  this.GetBadges();
  this.GetUsers();

  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);

    }

  });
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
         this.userBadgeService.Edit(this.UserBadgesForm?.value).subscribe({
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
 //======================================================================================
 Get(id:number){
  this.userBadgeService.Get(id).subscribe({
    next:(value)=>{
      this.UserBadgesForm.patchValue({
        id:value.id,
        userId:value.userId,
        badgeId:value.badgeId,
        isRejected:value.isRejected,
        disabled:value.disabled,
        isVisible:value.isVisible,
        isGranted:value.isGranted,
        rejectReason:value.rejectReason
      })
    }
  })
 }
}

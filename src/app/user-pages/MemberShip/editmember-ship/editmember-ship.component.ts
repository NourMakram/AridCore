import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { MemberShipService } from '../../../Services/member-ship.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editmember-ship',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './editmember-ship.component.html',
  styleUrl: './editmember-ship.component.css'
})
export class EditmemberShipComponent {
MemberShipForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private MemberShipService:MemberShipService,
  private userManagmentService:UserManagmentService,private activeRouter:ActivatedRoute,
  private Router:Router
){
this.MemberShipForm = this.fb.group({
  id: [''],
  membershipType: ['',Validators.required],
  applicationUserId:['',Validators.required],
  status:[false],
  dueDate:["",Validators.required],
 });

  this.GetMemberShipTypes();
   this.GetUsers();

   this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);
    }

  });

}

//=========================================================================================
Submit(){
   if (this.MemberShipForm.valid) {
        this.MemberShipService.Edit(this.MemberShipForm?.value).subscribe({
          next: () => {
            console.log("Success To Edit");
            this.Router.navigateByUrl("userPage/MemberShips");
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        Object.keys(this.MemberShipForm.controls).forEach(field => {
          const control = this.MemberShipForm.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
      }
  
}
//=========================================================================================
MemberShipTypes:GenaricModel[]=[];
GetMemberShipTypes(){
  this.MemberShipService.GetMembershipTypes().subscribe({
    next:(value)=>{
      this.MemberShipTypes = value;
    }
  })
}
//===========================================================================================
Get(id:string){
  this.MemberShipService.Get(id).subscribe({
    next:(value)=>{
      console.log(value);
      this.MemberShipForm.patchValue({
        id: value.id,
        membershipType:value.membershipType,
        dueDate: value.dueDate,
        applicationUserId: value.applicationUserId,
        status: value.status,
       });
    }
  })
}

//===========================================================================================
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

}

import { Component } from '@angular/core';
import { MemberShipService } from '../../../Services/member-ship.service';
import { MemberShip } from '../../../Models/MemberShip';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GenaricModel } from '../../../Models/GenaricModel';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addmember-ship',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './addmember-ship.component.html',
  styleUrl: './addmember-ship.component.css'
})
export class AddmemberShipComponent {
MemberShipForm:FormGroup;
constructor(private fb:FormBuilder,private MemberShipService:MemberShipService,
  private userManagmentService:UserManagmentService,
  private Router:Router
){
this.MemberShipForm = this.fb.group({
  // id: [''],
  membershipType: ['',Validators.required],
  applicationUserId:['',Validators.required],
  isPaid:[false]
});

  this.GetMemberShipTypes();
 this.GetUsers();
}

//=========================================================================================
Submit(){
   if (this.MemberShipForm.valid) {
        this.MemberShipService.Create(this.MemberShipForm?.value).subscribe({
          next: () => {
            console.log("Success To Add");
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

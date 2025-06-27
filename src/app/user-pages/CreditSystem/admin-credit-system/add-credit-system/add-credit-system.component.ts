import { Component } from '@angular/core';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../../Models/GenaricModel';
import { UserManagmentService } from '../../../../Services/user-managment.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-credit-system',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-credit-system.component.html',
  styleUrl: './add-credit-system.component.css'
})
export class AddCreditSystemComponent {
CreditSystemForm:FormGroup;
constructor(private fb:FormBuilder,private CreditSystemService:CreditSystemService,
  private userManagmentService:UserManagmentService,
  private Router:Router
){
this.CreditSystemForm = this.fb.group({
  commentToAdmin: ['',Validators.required],
  applicationUserId:['',Validators.required],
  isApproved:[false],
  amount:['',[Validators.required,Validators.min(1)]]
});

  this.GetUsers();
}

//=========================================================================================
Submit(){
   if (this.CreditSystemForm.valid) {
        this.CreditSystemService.Create(this.CreditSystemForm?.value).subscribe({
          next: () => {
            console.log("Success To Add");
            this.Router.navigateByUrl("userPage/CreditSystem");
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        Object.keys(this.CreditSystemForm.controls).forEach(field => {
          const control = this.CreditSystemForm.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
      }
  
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


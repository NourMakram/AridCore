import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../../Models/GenaricModel';
import { UserManagmentService } from '../../../../Services/user-managment.service';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-credit-system',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit-credit-system.component.html',
  styleUrl: './edit-credit-system.component.css'
})
export class EditCreditSystemComponent {
CreditSystemForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private CreditSystemService:CreditSystemService,
  private userManagmentService:UserManagmentService,
  private Router:Router,private activeRouter:ActivatedRoute
){
this.CreditSystemForm = this.fb.group({
  id:['',Validators.required],
  commentToAdmin: ['',Validators.required],
  applicationUserId:['',Validators.required],
  isApproved:[false],
  amount:['',[Validators.required,Validators.min(1)]]
});

 this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Get(this.id);

    });
  this.GetUsers();
}

//=========================================================================================
Submit(){
   if (this.CreditSystemForm.valid) {
        this.CreditSystemService.Edit(this.CreditSystemForm?.value).subscribe({
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
  //=============================================================================================
  Get(id:string){
    this.CreditSystemService.Get(id).subscribe({
      next:(value)=>{
        if(value!=null){
          this.CreditSystemForm.patchValue({
            id:value.id,
            commentToAdmin:value.commentToAdmin,
            amount:value.amount,
            isApproved:value.isApproved,
            applicationUserId:value.applicationUserId
          });
        }
      },
    })
  }

}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit-credit-system',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './user-edit-credit-system.component.html',
  styleUrl: './user-edit-credit-system.component.css'
})
export class UserEditCreditSystemComponent {
CreditSystemForm:FormGroup;
id:any;
userId:string|null = null;
constructor(private fb:FormBuilder,private CreditSystemService:CreditSystemService,
  private tokenServiceService:TokenServiceService,
  private Router:Router
  ,private activeRouter:ActivatedRoute
){
  this.userId = this.tokenServiceService.GetUserId();

this.CreditSystemForm = this.fb.group({
  id:['',Validators.required],
  commentToAdmin: ['',Validators.required],
  applicationUserId:[this.userId,Validators.required],
  isApproved:[false],
  amount:['',[Validators.required,Validators.min(1)]]
});

 this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Get(this.id);

    });
 }

//=========================================================================================
Submit(){
   if (this.CreditSystemForm.valid) {
        this.CreditSystemService.Edit(this.CreditSystemForm?.value).subscribe({
          next: () => {
             let Message = "تم تعديل البيانات بنجاح";
             this.NotificationMessage(Message, "success");
            this.Router.navigateByUrl("clientPage/Pages/CreditSystem");
          },
          error: (error) => {
            let Message = "فشل تعديل البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
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
 swalWithBootstrapButtons: any = Swal.mixin({
    customClass: {
      confirmButton: "btn text-white px-3 mx-2",
      cancelButton: "btn text-white px-3 mx-2"
    },
    buttonsStyling: true
  });
  NotificationMessage(title: string, icon: string) {
    this.swalWithBootstrapButtons.fire({
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 3000

    });
  }
}


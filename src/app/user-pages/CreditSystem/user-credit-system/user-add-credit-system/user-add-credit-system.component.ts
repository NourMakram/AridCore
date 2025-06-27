import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add-credit-system',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './user-add-credit-system.component.html',
  styleUrl: './user-add-credit-system.component.css'
})
export class UserAddCreditSystemComponent {
CreditSystemForm:FormGroup;
userId:string | null=null;
constructor(private fb:FormBuilder,private CreditSystemService:CreditSystemService,
  private tokenServiceService:TokenServiceService,
  private Router:Router
){
this.userId = this.tokenServiceService.GetUserId();
this.CreditSystemForm = this.fb.group({
  commentToAdmin: ['',Validators.required],
  applicationUserId:[this.userId,Validators.required],
  isApproved:[false],
  amount:['',[Validators.required,Validators.min(1)]]
});

 }

//=========================================================================================
Submit(){
   if (this.CreditSystemForm.valid && this.userId != null) {
        this.CreditSystemService.Create(this.CreditSystemForm?.value).subscribe({
          next: () => {
            console.log("Success To Add");
             let Message = "تم اضافة البيانات بنجاح";
        this.NotificationMessage(Message, "success");
            this.Router.navigateByUrl("clientPage/Pages/CreditSystem");
          },
          error: (error) => {
             let Message = "فشل اضافة البيانات حاول مرة اخري";
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
//=======================================================================================
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


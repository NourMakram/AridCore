import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
 import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dal',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './dal.component.html',
  styleUrl: './dal.component.css'
})
export class DALComponent {
DALForm:FormGroup;
constructor(private fb:FormBuilder, private auhtService:AuthService, private Router:Router){
  this.DALForm = fb.group({
     email:['',[Validators.required,Validators.email]] 
  })
}

Submit(){
  if (this.DALForm.valid) {
    let Email = this.DALForm.get('email')?.value;

    this.auhtService.SendDAL(Email).subscribe({
      next: () => {
         let Message = "تم ارسال رابط الدخول المباشر بنجاح ";
          this.NotificationMessage(Message, "success");
        
        console.log("Success To Add");
       // this.Router.navigateByUrl(`/EmailConifrm/${Email}`);
      },
      error: (error) => {
         let Message = "حدث خطأ اثناء ارسال رابط الدخول المباشر ";
                       this.NotificationMessage(Message, "error");
        console.log(error);
  
      }
    })
  }
  else {
    Object.keys(this.DALForm.controls).forEach(field => {
      const control = this.DALForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
}
//================================================================================
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

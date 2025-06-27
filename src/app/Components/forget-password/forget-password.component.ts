import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
ForgetPasswordForm:FormGroup;
constructor(private fb:FormBuilder, private auhtService:AuthService, private Router:Router){
  this.ForgetPasswordForm = fb.group({
     email:['',[Validators.required,Validators.email]] 
  })
}

Submit(){
  if (this.ForgetPasswordForm.valid) {
    let Email = this.ForgetPasswordForm.get('email')?.value;

    this.auhtService.SendConfirmCode(Email).subscribe({
      next: () => {
        console.log("Success To Add");
        let Message = "تم  ارسال كود التحقق بنجاح ";
          this.NotificationMessage(Message, "success");
        
        this.Router.navigateByUrl(`/EmailConifrm/${Email}`);
      },
      error: (error) => {
        let Message = "حدث خطأ اثناء ارسال كود التحقق حاول مرة اخرى ";
                       this.NotificationMessage(Message, "error");
        
        console.log(error);
  
      }
    })
  }
  else {
    Object.keys(this.ForgetPasswordForm.controls).forEach(field => {
      const control = this.ForgetPasswordForm.controls[field];
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

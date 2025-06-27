import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  Email:any;
  ResetForm:FormGroup;
constructor(private activeRouter:ActivatedRoute, private fb:FormBuilder,
  private Router:Router,private auhtService:AuthService
){
this.ResetForm = fb.group({
  email:[this.Email,Validators.required],
  newPassword:['',[Validators.required,Validators.min(6)]],
  confirmPassword: ['',[Validators.required, this.IsMatchdValidators()]],

})
}

IsMatchdValidators(): Validators {
  return (control: AbstractControl): ValidationErrors | null => {
    let confirmPass: string = control.value;
    let password: string = this.ResetForm?.get('newPassword')?.value;
    let vaildationError = { "NotMatched": { "value": confirmPass } }
    return (confirmPass != password) ? vaildationError : null;
  }
}
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.Email = params.get('Email');
      if(this.Email!=null){
        this.ResetForm.patchValue({
          email:this.Email
        })
      }
    });
  }
  Submit(){
    if (this.ResetForm.valid) {  
      this.auhtService.ResetPassword(this.ResetForm?.value).subscribe({
        next: () => {
          console.log("Success To Add");
             let Message = "تم تغيير كلمة المرور بنجاح";
        this.NotificationMessage(Message, "error");
          this.Router.navigateByUrl(`/Login`);
        },
        error: (error) => {
             let Message = "عذرا حدث خطأ اثناء تغيير كلمة المرور";
        this.NotificationMessage(Message, "error");
          console.log(error);
    
        }
      })
    }
    else {
      Object.keys(this.ResetForm.controls).forEach(field => {
        const control = this.ResetForm.controls[field];
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

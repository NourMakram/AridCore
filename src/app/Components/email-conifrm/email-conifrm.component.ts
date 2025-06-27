import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-conifrm',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './email-conifrm.component.html',
  styleUrl: './email-conifrm.component.css'
})
export class EmailConifrmComponent implements OnInit {
ForgetPasswordForm:FormGroup;
Email:any;
constructor(private fb:FormBuilder, private auhtService:AuthService, private Router:Router, private activeRouter:ActivatedRoute){
  this.ForgetPasswordForm = fb.group({
     code:['',[Validators.required,Validators.maxLength(6),Validators.minLength(6)]] ,
     email:[this.Email]
  })

 
}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.Email = params.get('Email');
      if(this.Email!=null){
        this.ForgetPasswordForm.patchValue({
          email:this.Email
        })
      }
    });
  }

Submit(){
  if (this.ForgetPasswordForm.valid&&this.Email!=null) {
console.log("data",this.ForgetPasswordForm?.value);
    this.auhtService.ConfirmEmail(this.ForgetPasswordForm?.value).subscribe({
      next: () => {
        console.log("Success To Add");
         let Message = "تم  التحقق من البريد الألكترونى بنجاح ";
          this.NotificationMessage(Message, "success");
        
         this.Router.navigateByUrl(`/resetPassword/${this.Email}`);
      },
      error: (error) => {
        let Message = "حدث خطأ اثناء التحقق من البريد الألكترونى  حاول مرة اخرى ";
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

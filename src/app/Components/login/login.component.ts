import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
 import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryService } from '../../Services/country.service';
import { TokenServiceService } from '../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-login',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
RegisterForm:FormGroup;
  returnUrl: string='/';

constructor(private auhtService:AuthService, private fb:FormBuilder,
  private TokenService:TokenServiceService,private route:ActivatedRoute,
   private countryService:CountryService, private Router:Router){
  this.RegisterForm= fb.group({
  email: ['',[Validators.required,Validators.email]],
  password: ['',Validators.min(6)],
   });
 }
 //===================================================================================================
  ngOnInit(): void {
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
//===================================================================================================
 ErrorMessage:string|null = null;
 Submit(){
  if (this.RegisterForm.valid) {
    this.auhtService.onLogin(this.RegisterForm?.value).subscribe({
      next: (value) => {
        if(value!=null){
          this.TokenService.SetToken(value.token);
          this.TokenService.SetUserId(value.userId);
          this.TokenService.SetRole(value.role);
           let Message = "تم  تسجيل الدخول بنجاح ";
          this.NotificationMessage(Message, "success");
          this.RedirectTo(value.role);

        }
        
      },
      error: (error) => {
        console.log(error);
         let Message = "البريد الألكترونى او كلمة المرور غير صحيحة";
          this.NotificationMessage(Message, "error");
      
           this.ErrorMessage = "البريد الألكترونى او كلمة المرور غير صحيحة"
 
      }
    })
  }
  else {
    Object.keys(this.RegisterForm.controls).forEach(field => {
      const control = this.RegisterForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

 }


 //=============================================================================================
 RedirectTo(role:string){
  if(role=="Member"){

      this.Router.navigateByUrl(this.returnUrl=="/"?'/clientPage':this.returnUrl);

  }
  else if(role=="Admin"){

      this.Router.navigateByUrl(this.returnUrl=="/"?'/userPage':this.returnUrl);


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

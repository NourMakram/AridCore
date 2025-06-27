import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
   import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CountryService } from '../../Services/country.service';
import { TokenServiceService } from '../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-account-for-others',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register-account-for-others.component.html',
  styleUrl: './register-account-for-others.component.css'
})
export class RegisterAccountForOthersComponent {
RegisterForm:FormGroup;
referredById:any;
constructor(private auhtService:AuthService, private fb:FormBuilder,
  private TokenService:TokenServiceService,private activeRouter:ActivatedRoute,
   private countryService:CountryService, private Router:Router){
  this.RegisterForm= fb.group({
  arName: ['',[
    Validators.required,
    Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  enName: ['',[
    Validators.required,
    Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
  ]],
  email: ['',[Validators.required,Validators.email]],
  password: ['',Validators.min(6)],
  ConfirmPassword: ['',[Validators.required, this.IsMatchdValidators()]],
  countryId:['',Validators.required],
  roleName: ['Member'],
  termsconditions:['',Validators.required],
  referredById:['',Validators.required]
  });
  this.GetCountries();

   this.activeRouter.paramMap.subscribe(params => {
    let id = params.get('id');
    if (id != undefined) {
      this.referredById = id;
        this.RegisterForm.patchValue({
          referredById : this.referredById
        })
    }

  });
}
//========================================================================================
IsMatchdValidators(): Validators {
  return (control: AbstractControl): ValidationErrors | null => {
    let confirmPass: string = control.value;
    let password: string = this.RegisterForm?.get('password')?.value;
    let vaildationError = { "NotMatched": { "value": confirmPass } }
    return (confirmPass != password) ? vaildationError : null;
  }
}
//========================================================================================
Countries: any[] = [];
GetCountries() {
  this.countryService.GetCountries().subscribe({
    next: (value) => {
      this.Countries = value;
    },
    error: (error) => {
      console.log(error)
    }
  });
}
//========================================================================================
ErrorMessage:string|null = null;
Submit(){
  if (this.RegisterForm.valid) {
    this.auhtService.onRegister(this.RegisterForm?.value).subscribe({
      next: (value) => {
        console.log("value",value);
        if(value!=null){
          this.TokenService.SetToken(value.token);
          this.TokenService.SetUserId(value.userId);
          this.TokenService.SetRole(value.role);
         let Message = "تم  انشاء الحساب بنجاح ";
          this.NotificationMessage(Message, "success");
          this.RedirectTo(value.role);
        }
         
      },
      error: (error) => {
        let Message = "البريد الألكترونى موجود  بالفعل قم بتسجيل الدخول";
        this.NotificationMessage(Message, "error");
        if(error.error=="Email is Exists try another Email"){
          this.ErrorMessage = "البريد الألكترونى موجود  بالفعل قم بتسجيل الدخول"
          console.log("Email is Exists try another Email")
        }

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

       this.Router.navigateByUrl('/clientPage');
  }
  else if(role=="Admin"){

        this.Router.navigateByUrl('/userPage');

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



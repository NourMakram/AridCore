import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  
  UpdateForm: FormGroup;
    userId:string|null=null;
    constructor(private TokenService: TokenServiceService, private authService: AuthService,
      private fb: FormBuilder,
    ) {
       this.UpdateForm = fb.group({
        oldPassword: ['',Validators.required],
        newPassword:['',[Validators.required,Validators.min(6)]],
        confirmPassword:['',[Validators.required, this.IsMatchdValidators()]],
        userId:[this.TokenService.GetUserId(),Validators.required]
        // contactMeDetail: [''],
      });
  
      //  this.userId = this.TokenService.GetUserId();
      //  if(this.userId!=null){
      //   this.GetUser(this.userId);
      //  }
      
    }

    IsMatchdValidators(): Validators {
      return (control: AbstractControl): ValidationErrors | null => {
        let confirmPass: string = control.value;
        let password: string = this.UpdateForm?.get('newPassword')?.value;
        let vaildationError = { "NotMatched": { "value": confirmPass } }
        return (confirmPass != password) ? vaildationError : null;
      }
    }
  
    Submit(){
      if (this.UpdateForm.valid) {
        // let Data = this.ConvertData();
        console.log("Success To Add");

        this.authService.ChangePassword(this.UpdateForm?.value).subscribe({
          next: () => {
            console.log("Success To Add");
             let Message = "تم  تغيير كلمة المرور بنجاح ";
          this.NotificationMessage(Message, "success");
             
          },
          error: (error) => {
             let Message = "حدث خطأ اثناء تغيير كلمة المرور حاول مرة اخري";
                       this.NotificationMessage(Message, "error");

            console.log(error);
          }
        })
      }
      else {
        Object.keys(this.UpdateForm.controls).forEach(field => {
          const control = this.UpdateForm.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
      }
    }
   //============================================================================================== 

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

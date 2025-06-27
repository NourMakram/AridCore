import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-contact',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './user-contact.component.html',
  styleUrl: './user-contact.component.css'
})
export class UserContactComponent {
 UpdateForm: FormGroup;
  userId:string|null=null;
  constructor(private TokenService: TokenServiceService, private authService: AuthService,
    private fb: FormBuilder,
  ) {
     this.UpdateForm = fb.group({
      contactDetails: ['',Validators.required],
      userId:[this.TokenService.GetUserId(),Validators.required]
      // contactMeDetail: [''],
    });

     this.userId = this.TokenService.GetUserId();
     if(this.userId!=null){
      this.GetUser(this.userId);
     }
    
  }

  Submit(){
    if (this.UpdateForm.valid&&this.userId!=null) {
      // let Data = this.ConvertData();

      this.authService.updateContact(this.UpdateForm?.value).subscribe({
        next: () => {
             let Message = "تم  تغيير البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          if(this.userId!=null){
            this.GetUser(this.userId);
           }
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء تغيير البيانات  حاول مرة اخري";
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
//==============================================================================
  User: UserModel = {} as UserModel;
   GetUser(userId: string) {
     this.authService.GetUser(userId).subscribe({
       next: (value) => {
         this.User = value;
         this.UpdateForm.patchValue({   
          contactDetails: this.User.contactMeDetail,   
         })
       }
       ,
       error: (error) => {
         console.log(error)
       }
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

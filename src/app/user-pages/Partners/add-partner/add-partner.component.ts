import { Component } from '@angular/core';
import { PartnerService } from '../../../Services/partner.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../Models/UserModel';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-partner',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-partner.component.html',
  styleUrl: './add-partner.component.css'
})
export class AddPartnerComponent {
PartnerForm: FormGroup;
  userId: string | null = null;
  RoleName:string | null = null;
  constructor(private fb: FormBuilder, private partnerService:PartnerService,
    private tokenServiceService: TokenServiceService, private authService: AuthService,
    private Router: Router
  ) {
    this.userId = this.tokenServiceService.GetUserId();
    this.RoleName= this.tokenServiceService.GetRole();
    this.PartnerForm = this.fb.group({
      applicationUserId: [this.userId, Validators.required],
      name:['',Validators.required],
      mobile: ['',[Validators.required,Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      email: ['',[Validators.required,Validators.email]],
      details:['',Validators.required],
      isVisible: [true,Validators.required]
    });



  }
  ngOnInit(): void {
    if(this.userId != null){
      this.Get();
    }
  }

  //=========================================================================================
  CheckBalance() {
    if (this.PartnerForm.valid) {
     
      if (this.userData?.balance > 10 && this.userData.creditBalance == 0) {

        this.Submit();

      }
      else {

        let Message = "حسابكم غير مؤهل للتقديم على نظام شركاء الحوالات المالية لاعضاء منصة اريد. الرجاء تعبئة رصيدكم وتقديم الطلب";
         this.NotificationMessage(Message, "error");

      }


    }
    else {
      Object.keys(this.PartnerForm.controls).forEach(field => {
        const control = this.PartnerForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
//=========================================================================================
  Submit() {
    
    this.partnerService.Create(this.PartnerForm?.value).subscribe({
      next: () => {
        let Message = "تم اضافة البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        if(this.RoleName != null){
          
          this.GoBack();

        }
      },
      error: (error) => {
         let Message = "فشل اضافة البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
        console.log(error);
      }
    })


  }

  //==========================================================================================
  userData: UserModel = {} as UserModel;
  Get() {
    if (this.userId != null && this.userId != undefined) {
      this.authService.GetUser(this.userId).subscribe({
        next: (value) => {
          this.userData = value;
            if(this.userData != null){
              this.PartnerForm.patchValue({
                email:this.userData.email,
                applicationUserId:this.userData.id,
                mobile:this.userData.phoneNumber,
                name:this.userData.arName
              })
            }
        }
      });
    }


  }
  //=======================================================================================
  GoBack(){

     if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl("clientPage/Pages/Partner");

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl("userPage/Partner");

     }
     }
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
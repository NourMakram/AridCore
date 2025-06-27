import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import Swal from 'sweetalert2';
import { TokenServiceService } from '../../../Services/token-service.service';

@Component({
  selector: 'app-add-crowd-funding',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-crowd-funding.component.html',
  styleUrl: './add-crowd-funding.component.css'
})
export class AddCrowdFundingComponent {
CrowdFundingForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private CrowdFundingService:CrowdFundingService) {
   
  this.userId = TokenService.GetUserId();
  this.RoleName = TokenService.GetRole();

  this.CrowdFundingForm = fb.group({
    applicationUserId:[this.userId,Validators.required],
    title :['',Validators.required],
    details :['',Validators.required],
    purpose :['',Validators.required],
    budget :['',[Validators.required,Validators.min(1)]],
    imageFileUrl:['',Validators.required],
    fileUrl:['',Validators.required],
    duration:['',[Validators.required,Validators.min(1)]],
    video:['']
  });
}

//====================================================================================================
 Submit() {
    if (this.CrowdFundingForm.valid) {
      let Data = this.ConvertData();
      this.CrowdFundingService.Create(Data).subscribe({
        next: () => {
          let Message = "تم اضافة البيانات بنجاح";
              this.NotificationMessage(Message, "success");
              this.GoBack();
         },
        error: (error) => {
           let Message = "فشل اضافة البيانات حاول مرة اخري";
              this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.CrowdFundingForm.controls).forEach(field => {
        const control = this.CrowdFundingForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  ConvertData() {
    let formData = new FormData();
    formData.append('video', this.CrowdFundingForm.get('video')?.value);
    formData.append('duration', this.CrowdFundingForm.get('duration')?.value);
     formData.append('budget', this.CrowdFundingForm.get('budget')?.value);
    formData.append('purpose', this.CrowdFundingForm.get('purpose')?.value);
    formData.append('details', this.CrowdFundingForm.get('details')?.value);
    formData.append('title', this.CrowdFundingForm.get('title')?.value);
   
    if(this.userId!=null){
     formData.append('applicationUserId', this.userId);
    }

    if (this.FileUrl) {
      formData.append('fileUrl', this.FileUrl);

    }

    if (this.ImageUrl) {
      formData.append('imageFileUrl', this.ImageUrl);

    }
    return formData;
  }
  //==============================================================================
  FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
  //==================================================================================================
  ImageUrl: File | undefined = undefined;
  OnchangeImage(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.ImageUrl = input.files[0];
      console.log(this.ImageUrl)
    }

  }
  //==================================================================================================
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
  //==================================================================================================
 GoBack(){

     if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl("clientPage/CrowdFunding");

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl("userPage/CrowdFunding");

     }
     }
  }
}

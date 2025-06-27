import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { GenaricModel } from '../../../Models/GenaricModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-crowd-funding',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './edit-crowd-funding.component.html',
  styleUrl: './edit-crowd-funding.component.css'
})
export class EditCrowdFundingComponent {
  CrowdFundingForm: FormGroup;
  userId: any;
  RoleName: any;
  id:any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private CrowdFundingService: CrowdFundingService
    ,private activeRouter:ActivatedRoute) {

    this.userId = TokenService.GetUserId();
    this.RoleName = TokenService.GetRole();
    this.GetCrowdFundingStatus();
    this.CrowdFundingForm = fb.group({
      id: ['',Validators.required],
      applicationUserId: [this.userId, Validators.required],
      title: ['', Validators.required],
      details: ['', Validators.required],
      purpose: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]],
      imageFileUrl: [''],
      fileUrl: [''],
      duration: ['', [Validators.required, Validators.min(1)]],
      video: [''],
      stopAcceptPayments: [false],
      closingDate: [''],
      startingDate: [''],
      status: ['']

    });

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);

      }

    });
  }
  //====================================================================================================
CrowdFundingStatus : GenaricModel[] =[];
  GetCrowdFundingStatus(){
this.CrowdFundingService.CrowdFundingStauts().subscribe({
next:(value)=>{
  this.CrowdFundingStatus = value;
}
});
}
  //====================================================================================================
  Submit() {
    if (this.CrowdFundingForm.valid) {
      let Data = this.ConvertData();
      this.CrowdFundingService.Edit(Data).subscribe({
        next: () => {
          let Message = "تم تعديل البيانات بنجاح";
          this.NotificationMessage(Message, "success");
          this.GoBack();
        },
        error: (error) => {
          let Message = "فشل تعديل البيانات حاول مرة اخري";
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
    if(this.id > 0){
    formData.append('id', this.id);
    }
    formData.append('video', this.CrowdFundingForm.get('video')?.value);
    formData.append('duration', this.CrowdFundingForm.get('duration')?.value);
    formData.append('budget', this.CrowdFundingForm.get('budget')?.value);
    formData.append('purpose', this.CrowdFundingForm.get('purpose')?.value);
    formData.append('details', this.CrowdFundingForm.get('details')?.value);
    formData.append('title', this.CrowdFundingForm.get('title')?.value);
    formData.append('status', this.CrowdFundingForm.get('status')?.value);
    formData.append('startingDate', this.CrowdFundingForm.get('startingDate')?.value);
    formData.append('closingDate', this.CrowdFundingForm.get('closingDate')?.value);
    formData.append('stopAcceptPayments', this.CrowdFundingForm.get('stopAcceptPayments')?.value);

    if (this.userId != null) {
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
  Get(id: number) {
    this.CrowdFundingService.Get(id).subscribe({
      next: (value) => {


        this.CrowdFundingForm.patchValue({
          id: value.id,
          applicationUserId: value.applicationUserId,
          title: value.title,
          details: value.details,
          purpose: value.purpose,
          budget: value.budget,
          duration: value.duration,
          video: value.video,
          stopAcceptPayments: value.stopAcceptPayments,
          closingDate: value.closingDate,
          startingDate: value.startingDate,
          status: value.status,
        });
      }
    })
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
  GoBack() {

    if (this.RoleName != null) {

      if (this.RoleName == "Member") {

        this.Router.navigateByUrl("clientPage/CrowdFunding");

      }
      else if (this.RoleName == "Admin") {

        this.Router.navigateByUrl("userPage/CrowdFunding");

      }
    }
  }
}

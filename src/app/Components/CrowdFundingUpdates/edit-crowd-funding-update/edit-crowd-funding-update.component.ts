import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrowdFundingUpdateService } from '../../../Services/crowd-funding-update.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AddCrowdFundingUpdateComponent } from '../add-crowd-funding-update/add-crowd-funding-update.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-crowd-funding-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-crowd-funding-update.component.html',
  styleUrl: './edit-crowd-funding-update.component.css'
})
export class EditCrowdFundingUpdateComponent {
  CrowdFundingUpdateForm: FormGroup;
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private crowdFundingUpdateService: CrowdFundingUpdateService
    , public dialogRef: MatDialogRef<AddCrowdFundingUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { projectId: number, id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.CrowdFundingUpdateForm = fb.group({
      id: [this.Data.id, Validators.required],
      crowdFundingId: [this.Data.projectId, Validators.required],
      applicationUserId: [this.userId, Validators.required],
      imageUrlFile: [''],
      fileUrl: [''],
      details: ['', Validators.required],
      phaseName: ['', Validators.required]
    });

    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
  }
  //====================================================================================================
  Get(id: number) {
    this.crowdFundingUpdateService.Get(id).subscribe({
      next: (value) => {

        this.CrowdFundingUpdateForm.patchValue({
          id: value.id,
          crowdFundingId: value.crowdFundingId,
          applicationUserId: value.applicationUserId,
          details: value.details,
          phaseName: value.phaseName,
        })
      }
    })
  }
  //====================================================================================================
  Submit() {
    if (this.CrowdFundingUpdateForm.valid) {
      let Data = this.ConvertFormData();
      this.crowdFundingUpdateService.Edit(Data)
        .subscribe({
          next: (value) => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.dialogRef.close(false);
          }
        })
    }
    else {
      Object.keys(this.CrowdFundingUpdateForm.controls).forEach(field => {
        const control = this.CrowdFundingUpdateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //==================================================================================================
  ConvertFormData() {
    let formData1 = new FormData();
    if (this.Data.id > 0) {
      formData1.append('id', this.Data.id.toString());

    }
    if (this.Data.projectId > 0) {
      formData1.append('crowdFundingId', this.Data.projectId.toString());

    }
    if (this.userId != undefined) {

      formData1.append('applicationUserId', this.userId);

    }
    formData1.append('phaseName', this.CrowdFundingUpdateForm.get('phaseName')?.value);
    formData1.append('details', this.CrowdFundingUpdateForm.get('details')?.value);

    if (this.FileUrl) {
      formData1.append('fileUrl', this.FileUrl);

    }

    if (this.ImageUrl) {
      formData1.append('imageUrlFile', this.ImageUrl);

    }
    return formData1;


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

  //================================================================================================
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

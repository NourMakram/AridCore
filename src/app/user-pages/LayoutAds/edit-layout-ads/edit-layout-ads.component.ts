import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LayoutAdsService } from '../../../Services/layout-ads.service';
import { TokenServiceService } from '../../../Services/token-service.service';

@Component({
  selector: 'app-edit-layout-ads',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './edit-layout-ads.component.html',
  styleUrl: './edit-layout-ads.component.css'
})
export class EditLayoutAdsComponent {
  layoutAdsForm: FormGroup;
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private layoutAdsService: LayoutAdsService
    , public dialogRef: MatDialogRef<EditLayoutAdsComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.layoutAdsForm = fb.group({
      id: ['', Validators.required],
      ApplicationUserId: [this.userId, Validators.required],
      Indx: ['', Validators.required],
      Position: ['', Validators.required],
      IsVisible: ['', Validators.required],
      Class: ['', Validators.required],
      Url: ['', Validators.required],
      Title: ['', Validators.required],
      image: ['']
    });

    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
  }

  //====================================================================================================
  Submit() {
    if (this.layoutAdsForm.valid) {

      let Data = this.ConvertToFormData();
      this.layoutAdsService.Edit(this.Data.id, Data)
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
      Object.keys(this.layoutAdsForm.controls).forEach(field => {
        const control = this.layoutAdsForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //==================================================================================================
  ConvertToFormData() {
    let formData1 = new FormData();
    formData1.append('id', this.layoutAdsForm.get('id')?.value);
    formData1.append('title', this.layoutAdsForm.get('Title')?.value);
    formData1.append('indx', this.layoutAdsForm.get('Indx')?.value);
    formData1.append('position', this.layoutAdsForm.get('Position')?.value);
    formData1.append('isVisible', this.layoutAdsForm.get('IsVisible')?.value);
    formData1.append('class', this.layoutAdsForm.get('Class')?.value);
    formData1.append('url', this.layoutAdsForm.get('Url')?.value);
    formData1.append('applicationUserId', this.userId);
    if (this.FileUrl != undefined) {
      formData1.append('formFile', this.FileUrl);

    }
    return formData1;
  }
  //==================================================================================================
  FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
  //==============================================================================
  Get(id: number) {
    this.layoutAdsService.Get(id).subscribe({
      next: (value) => {
        this.layoutAdsForm.patchValue({
          id: value.id,
          ApplicationUserId: value.applicationUserId,
          Indx: value.indx,
          Position: value.position,
          IsVisible: value.isVisible,
          Class: value.class,
          Url: value.url,
          Title: value.title,
        })
      }
    })
  }
}

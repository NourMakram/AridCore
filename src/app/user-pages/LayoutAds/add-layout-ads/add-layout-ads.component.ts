import { Component, Inject } from '@angular/core';
import { LayoutAdsService } from '../../../Services/layout-ads.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-layout-ads',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-layout-ads.component.html',
  styleUrl: './add-layout-ads.component.css'
})
export class AddLayoutAdsComponent {
layoutAdsForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private layoutAdsService:LayoutAdsService
,public dialogRef: MatDialogRef<AddLayoutAdsComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.layoutAdsForm = fb.group({
    ApplicationUserId:[this.userId,Validators.required],
    Indx :['',Validators.required],
    Position :['',Validators.required],
    IsVisible :[false,Validators.required],
    Class :['',Validators.required],
    Url :['',Validators.required],
    Title :['',Validators.required],
    image:['',Validators.required]
  });
}

//====================================================================================================
 Submit() {
    if (this.layoutAdsForm.valid) {

     let Data = this.ConvertToFormData();
       this.layoutAdsService.Create(Data)
      .subscribe({
        next:(value)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
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
  ConvertToFormData(){
let formData1 = new FormData();
formData1.append('title',this.layoutAdsForm.get('Title')?.value);
formData1.append('indx',this.layoutAdsForm.get('Indx')?.value);
formData1.append('position',this.layoutAdsForm.get('Position')?.value);
formData1.append('isVisible',this.layoutAdsForm.get('IsVisible')?.value);
formData1.append('class',this.layoutAdsForm.get('Class')?.value);
formData1.append('url',this.layoutAdsForm.get('Url')?.value);
formData1.append('applicationUserId',this.userId);
if(this.FileUrl!=null){
  formData1.append('formFile',this.FileUrl);

}
return formData1;

  }
//==================================================================================================
  //==============================================================================
  FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  } 
  
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CertificateTemplate } from '../../../Models/CertificateTemplate';
import { EmailContent } from '../../../Models/EmailContent';
import { BadgesService } from '../../../Services/badges.service';
import { CertificateTemplatesService } from '../../../Services/certificate-templates.service';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-badge',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit-badge.component.html',
  styleUrl: './edit-badge.component.css'
})
export class EditBadgeComponent {
BadgeForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private EmailContentService:EmailContentsService,
  private  certificateTemplatesService:CertificateTemplatesService,
  private activeRouter:ActivatedRoute,
  private BadgeService:BadgesService,private Router:Router){
  this.BadgeForm = this.fb.group({
    imageFile:[''],
    EmailContentId:['',Validators.required],
    EnBadgeDesc :['',Validators.required],
    ArBadgeDesc :['',Validators.required],
    EnBadgeName :['',[Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
    ArBadgeName :['',[Validators.required, Validators.pattern(/^[\u0600-\u06FF0-9\s]+$/)]],
    EnLetterTemplateId:['',Validators.required],
    AraLetterTemplateId:['',Validators.required],
    AraCertificateTemplateId:['',Validators.required],
    CertificateTemplateId:['',Validators.required],

  });
  this.GeEmailContents();
  this.GecertificateTemplates();

  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);

    }

  });
}

///===============================================================================================
EmailContents:EmailContent[]=[];
GeEmailContents(){
this.EmailContentService.GetAllList().subscribe({
  next:(value)=>{
    this.EmailContents = value;
  }
})
}
///===============================================================================================
certificateTemplates:CertificateTemplate[]=[];
GecertificateTemplates(){
this.certificateTemplatesService.GetCertificateTemplates().subscribe({
  next:(value)=>{
    this.certificateTemplates = value;
  }
})
}
///===============================================================================================
Submit(){
  if (this.BadgeForm.valid) {
    let Data = this.ConvertDataToFormData();
       this.BadgeService.Edit(Data).subscribe({
         next: () => {
           console.log("Success To Add");
           this.Router.navigateByUrl("userPage/Badges");
         },
         error: (error) => {
           console.log(error);
         }
       })
     }
     else {
       Object.keys(this.BadgeForm.controls).forEach(field => {
         const control = this.BadgeForm.controls[field];
         control.markAsTouched({ onlySelf: true });
       });
     }
 
}
///===============================================================================================
ConvertDataToFormData(){
  let formData1=new FormData();
  formData1.append('id',this.id);
  formData1.append('emailContentId',this.BadgeForm.get('EmailContentId')?.value);
  formData1.append('arBadgeDesc',this.BadgeForm.get('ArBadgeDesc')?.value);
  formData1.append('enBadgeDesc',this.BadgeForm.get('EnBadgeDesc')?.value);
  formData1.append('enBadgeName',this.BadgeForm.get('EnBadgeName')?.value);
  formData1.append('arBadgeName',this.BadgeForm.get('ArBadgeName')?.value);
  formData1.append('isVisible',"true");
  formData1.append('enLetterTemplateId',this.BadgeForm.get('EnLetterTemplateId')?.value);
  formData1.append('araLetterTemplateId',this.BadgeForm.get('AraLetterTemplateId')?.value);
  formData1.append('araCertificateTemplateId',this.BadgeForm.get('AraCertificateTemplateId')?.value);
  formData1.append('certificateTemplateId',this.BadgeForm.get('CertificateTemplateId')?.value);

if(this.FileUrl!=null){
  formData1.append('imageFile',this.FileUrl);
}
return formData1;

}
///===============================================================================================
FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
  ///===============================================================================================
 Get(id:number){
  this.BadgeService.Get(id).subscribe({
    next:(value)=>{
      if(value!=null){
        this.BadgeForm.patchValue({
          id:value.id,
          CertificateTemplateId:value.certificateTemplateId,
          AraCertificateTemplateId:value.araCertificateTemplateId,
          AraLetterTemplateId:value.araLetterTemplateId,
          EnLetterTemplateId:value.enLetterTemplateId,
          ArBadgeName:value.arBadgeName,
          EnBadgeName:value.enBadgeName,
          EnBadgeDesc:value.enBadgeDesc,
          ArBadgeDesc:value.arBadgeDesc,
          EmailContentId:value.emailContentId,

        });
      }
    }
  })
 }
}


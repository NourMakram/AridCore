import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { Router, RouterLink } from '@angular/router';
import { CertificateTemplatesService } from '../../../Services/certificate-templates.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-en-certificate-templates',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-en-certificate-templates.component.html',
  styleUrl: './add-en-certificate-templates.component.css'
})
export class AddEnCertificateTemplatesComponent {
CertificateForm:FormGroup;
constructor(private fb:FormBuilder,private CertificateTemplatesService:CertificateTemplatesService,
  private Router:Router
){
  this.CertificateForm = this.fb.group({
    HeaderTitle :["CERTIFICATE OF ATTENDANCE" ,Validators.required],
    FirstLine:["This is to certify that"],
    MainTitle  :['',Validators.required],
    SecondLine :["Successfully participated at the scientific lecture",Validators.required],
    ThirdLine :["Organized by ARID Scientific"],
    AlternativePrivilege :['test'],
    Language  :['',Validators.required],
    CertificateTemplateFolder  :['',Validators.required],
    CertificateBackground  :['',Validators.required],
    IsPdf :[false],
    IsActive :[false],
    IsRequiredUserEntry :[false],
    IsCanBeShipped :[false],
    PdfFees :[5],
    PaperBasedFees :[30],
    IsDetailsCoursePageVisible :[false],
    IsBadgeRequired :[false],
    image:['',Validators.required]
  });
  this.GetCertificateTemplateFolders();

}
//==================================================================================================
CertificateTemplateFolders:GenaricModel[]=[];
GetCertificateTemplateFolders(){
  this.CertificateTemplatesService.GetCertificateTemplateFolders().subscribe({
    next:(value)=>{
      this.CertificateTemplateFolders = value;
    }
  })
}
//==================================================================================================
Submit(){
   if (this.CertificateForm.valid) {
        let Data = this.ConvertData();
        this.CertificateTemplatesService.Create(Data).subscribe({
          next: () => {
            console.log("Success To Add");
            this.Router.navigateByUrl("/userPage/CertificateTemplates");
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        Object.keys(this.CertificateForm.controls).forEach(field => {
          const control = this.CertificateForm.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
      }
  
}
//================================================================================================
ConvertData(){
  let formData = new FormData();
formData.append("isBadgeRequired",this.CertificateForm.get("IsBadgeRequired")?.value);
formData.append("isDetailsCoursePageVisible",this.CertificateForm.get("IsDetailsCoursePageVisible")?.value);
formData.append("paperBasedFees",this.CertificateForm.get("PaperBasedFees")?.value);
formData.append("pdfFees",this.CertificateForm.get("PdfFees")?.value);
formData.append("isCanBeShipped",this.CertificateForm.get("IsCanBeShipped")?.value);
formData.append("isRequiredUserEntry",this.CertificateForm.get("IsRequiredUserEntry")?.value);
formData.append("isActive",this.CertificateForm.get("IsActive")?.value);
formData.append("isPdf",this.CertificateForm.get("IsPdf")?.value);
formData.append("certificateBackground",this.CertificateForm.get("CertificateBackground")?.value);
formData.append("certificateTemplateFolder",this.CertificateForm.get("CertificateTemplateFolder")?.value);
formData.append("language",this.CertificateForm.get("Language")?.value);
formData.append("alternativePrivilege",this.CertificateForm.get("AlternativePrivilege")?.value);
formData.append("thirdLine",this.CertificateForm.get("ThirdLine")?.value);
formData.append("secondLine",this.CertificateForm.get("SecondLine")?.value);
formData.append("mainTitle",this.CertificateForm.get("MainTitle")?.value);
formData.append("firstLine",this.CertificateForm.get("FirstLine")?.value);
formData.append("headerTitle",this.CertificateForm.get("HeaderTitle")?.value);
if(this.FileUrl != null){
  formData.append("myFile",this.FileUrl);

}

return formData;
}
//====================================================================================================
FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
}

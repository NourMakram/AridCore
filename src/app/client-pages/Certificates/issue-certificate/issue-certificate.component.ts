import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo, UserModel } from '../../../Models/UserModel';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { AddAridCertificateComponent } from '../../../user-pages/AridCertificate/add-arid-certificate/add-arid-certificate.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-certificate',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './issue-certificate.component.html',
  styleUrl: './issue-certificate.component.css'
})
export class IssueCertificateComponent {
CertificateForm: FormGroup;
  userId: any;
  RoleName: any;
   loading = false;
   TemplateId:any;
   lang:any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private aridCertificateService: AridCertificateService,
     private userManagmentService:UserManagmentService,private activatedRoute:ActivatedRoute

  ) {

     this.activatedRoute.queryParams.subscribe(params => {
    this.TemplateId = params['templateId']; // Retrieve the id query parameter
    this.lang = params['language']; // Retrieve the name query parameter
   });

     this.userId = this.TokenService.GetUserId();
 


    

    let nameValidator;
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
     const englishRegex = /^[A-Za-z\s]+$/;

     if (this.lang === 0) {
    nameValidator = [Validators.required, Validators.pattern(arabicRegex)];
  } else if (this.lang === 1) {
    nameValidator = [Validators.required, Validators.pattern(englishRegex)];
  } else {
    nameValidator = [Validators.required];
  }

    this.CertificateForm = fb.group({
       certificateName: ['', nameValidator],
      initialAssignedCertificateName: ['',nameValidator],
      applicationUserId :[this.userId,Validators.required],
      certificateTemplateId: [this.TemplateId,Validators.required],
      secondaryTitle :['',nameValidator],
    });
   }
   
  //====================================================================================================
  ErrorMessage:string|null = null;

  Submit() {
    if (this.CertificateForm.valid) {
        
           this.SendData();
         
       }
      else {
      Object.keys(this.CertificateForm.controls).forEach(field => {
        const control = this.CertificateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  
  
  //==============================================================================
  SendData(){
 this.aridCertificateService.Issue(this.CertificateForm?.value)
        .subscribe({
          next: (value) => {
          this.Router.navigateByUrl(`/clientPage/Certificates/Details/3`);

          },
          error: (error) => {
            console.log(error);
          }
        });
  }

  //==================================================================================================
  

  //==================================================================================================
// //==============================================================================
// User:UserModel = {} as UserModel;
// GetUser(userId:string){
//   this.userManagmentService.GetUser(userId).subscribe({
//     next:(value)=>{
//       this.User = value;
//     }
//     ,
//     error:(error)=>{
//       console.log(error)
//     }
//   })
// }
}



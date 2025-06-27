import { Component, Inject } from '@angular/core';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-certificate',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './edit-certificate.component.html',
  styleUrl: './edit-certificate.component.css'
})
export class EditCertificateComponent {
CertificateForm: FormGroup;
  userId: any;
  RoleName: any;
   loading = false;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private aridCertificateService: AridCertificateService,
     public dialogRef: MatDialogRef<EditCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { id: number , Language:string }

  ) {

    this.userId = this.TokenService.GetUserId();
 
    let nameValidator;
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
     const englishRegex = /^[A-Za-z\s]+$/;

     if (this.Data.Language === "اللغة العربية") {
    nameValidator = [Validators.required, Validators.pattern(arabicRegex)];
  } else if (this.Data.Language === "اللغة الإنجليزية") {
    nameValidator = [Validators.required, Validators.pattern(englishRegex)];
  } else {
    nameValidator = [Validators.required];
  }

    this.CertificateForm = fb.group({
      id: [this.Data.id, Validators.required],
      certificateName: ['', nameValidator],
    });
    // this.GetUsers();
  }

  
    
  //====================================================================================================
  Submit() {
    if (this.CertificateForm.valid) {
      this.aridCertificateService.EditName(this.CertificateForm?.value)
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
      Object.keys(this.CertificateForm.controls).forEach(field => {
        const control = this.CertificateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //================================================================================================
// Get(id:string){
//   this.aridCertificateService.Get(id).subscribe({
//     next:(value)=>{
      
//     }
//   })
//}
   





}

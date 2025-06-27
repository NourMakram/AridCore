import { Component, getNgModuleById, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { UserInfo } from '../../../Models/UserModel';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-arid-certificate',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,MatOption,NgSelectModule,MatFormFieldModule,
      MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './add-arid-certificate.component.html',
  styleUrl: './add-arid-certificate.component.css'
})
export class AddAridCertificateComponent   {
CertificateForm: FormGroup;
  userId: any;
  RoleName: any;
   loading = false;
   lang:number = 0;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private aridCertificateService: AridCertificateService,
     public dialogRef: MatDialogRef<AddAridCertificateComponent>,
     private userManagmentService:UserManagmentService,
    @Inject(MAT_DIALOG_DATA) public Data: { TemplateId: string , Language:number }

  ) {

    this.lang = this.Data.Language;
    this.userId = this.TokenService.GetUserId();
 
    let nameValidator;
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
     const englishRegex = /^[A-Za-z\s]+$/;

     if (this.Data.Language === 0) {
    nameValidator = [Validators.required, Validators.pattern(arabicRegex)];
  } else if (this.Data.Language === 1) {
    nameValidator = [Validators.required, Validators.pattern(englishRegex)];
  } else {
    nameValidator = [Validators.required];
  }

    this.CertificateForm = fb.group({
       certificateName: ['', nameValidator],
      initialAssignedCertificateName: [' ',nameValidator],
      applicationUserId :['',Validators.required],
      certificateTemplateId: [this.Data.TemplateId,Validators.required],
      secondaryTitle :['',nameValidator],
    });
   }
   
  
    
  //====================================================================================================
  ErrorMessage:string|null = null;

  Submit() {
    if (this.CertificateForm.valid) {
       this.aridCertificateService.CheckIssue(this.CertificateForm.get('applicationUserId')?.value,this.Data.TemplateId).subscribe({
        next:(value)=>{
           this.SendData();
        },
        error:(error)=>{
          this.ErrorMessage = error.error.error;
          console.log(error.error?.error);
        }
    });
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
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.dialogRef.close(false);
          }
        });
  }

  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }

  //==================================================================================================
  userControl = new FormControl<string | UserInfo>('');
  filteredUsers: UserInfo[] = [];
  FilterUsers(e: any) {
    let SearchName = e.target.value;
    this.userManagmentService.GetUsersList(1, 40, SearchName).subscribe({
      next: (value) => {
        this.filteredUsers = value.data;
      }
    });
  }
  //===================================================================================================
  public displayUser(user: any): string {
    return user ? user.name : '';
  }
  //====================================================================================
   
  //===================================================================================================
  onUserSelected(event: any) {
    console.log("selected", event)
    const selectedUser: UserInfo = event.option.value;
    if(this.Data.Language == 0){
          this.CertificateForm.patchValue({ applicationUserId: selectedUser.id ,certificateName:selectedUser.name});

    }
    else{
    this.CertificateForm.patchValue({ applicationUserId: selectedUser.id ,certificateName:selectedUser.enName});

    }
  }
  //=======================================================================================
  
}

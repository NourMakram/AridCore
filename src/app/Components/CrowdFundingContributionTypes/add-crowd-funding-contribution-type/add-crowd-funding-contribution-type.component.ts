import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { DonateCrowdFundingComponent } from '../../CrowdFunding/donate-crowd-funding/donate-crowd-funding.component';
import { Router, RouterLink } from '@angular/router';
import { CrowdFundingContributionTypeService } from '../../../Services/crowd-funding-contribution-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-crowd-funding-contribution-type',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './add-crowd-funding-contribution-type.component.html',
  styleUrl: './add-crowd-funding-contribution-type.component.css'
})
export class AddCrowdFundingContributionTypeComponent {
CrowdFundingContributionTypeForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private CrowdFundingContributionTypeService:CrowdFundingContributionTypeService
,public dialogRef: MatDialogRef<AddCrowdFundingContributionTypeComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.CrowdFundingContributionTypeForm = fb.group({
    crowdFundingId:[this.Data.id,Validators.required],
    amount :['',[Validators.required,Validators.min(1)]],
    reward :['',Validators.required],

     
  });
}

//====================================================================================================
 Submit() {
    if (this.CrowdFundingContributionTypeForm.valid) {
       this.CrowdFundingContributionTypeService.Create(this.CrowdFundingContributionTypeForm?.value)
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
      Object.keys(this.CrowdFundingContributionTypeForm.controls).forEach(field => {
        const control = this.CrowdFundingContributionTypeForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
   
 //================================================================================================
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

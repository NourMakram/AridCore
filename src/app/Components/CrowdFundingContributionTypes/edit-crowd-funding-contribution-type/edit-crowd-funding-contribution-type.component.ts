import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { CrowdFundingContributionTypeService } from '../../../Services/crowd-funding-contribution-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-crowd-funding-contribution-type',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-crowd-funding-contribution-type.component.html',
  styleUrl: './edit-crowd-funding-contribution-type.component.css'
})
export class EditCrowdFundingContributionTypeComponent {
CrowdFundingContributionTypeForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private CrowdFundingContributionTypeService:CrowdFundingContributionTypeService,
public dialogRef: MatDialogRef<EditCrowdFundingContributionTypeComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {projectId:number,id:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.CrowdFundingContributionTypeForm = fb.group({
    crowdFundingId:[this.Data.projectId,Validators.required],
    amount :['',[Validators.required,Validators.min(1)]],
    reward :['',Validators.required],

     
  });

  if(this.Data.id > 0){
    this.Get(this.Data.id);
  }
}

//====================================================================================================
 Submit() {
    if (this.CrowdFundingContributionTypeForm.valid) {
      this.CrowdFundingContributionTypeService.Edit(this.Data.id,this.CrowdFundingContributionTypeForm?.value)
      .subscribe({
        next:(value)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
          this.dialogRef.close(false);
        }
      })
    //  this.dialogRef.close(this.CrowdFundingContributionTypeForm?.value);
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
   Get(id:number){
    this.CrowdFundingContributionTypeService.Get(id).subscribe({
      next:(value)=>{
        this.CrowdFundingContributionTypeForm.patchValue({
          reward:value.reward,
          amount:value.amount,
          crowdFundingId:value.crowdFundingId
        })
      }
    })
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



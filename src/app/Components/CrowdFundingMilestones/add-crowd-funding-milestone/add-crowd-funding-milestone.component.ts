import { Component, Inject } from '@angular/core';
import { CrowdFundingMilestoneService } from '../../../Services/crowd-funding-milestone.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-add-crowd-funding-milestone',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './add-crowd-funding-milestone.component.html',
  styleUrl: './add-crowd-funding-milestone.component.css'
})
export class AddCrowdFundingMilestoneComponent {
CrowdFundingMilestoneForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private crowdFundingMilestoneService:CrowdFundingMilestoneService
,public dialogRef: MatDialogRef<AddCrowdFundingMilestoneComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.CrowdFundingMilestoneForm = fb.group({
    crowdFundingId:[this.Data.id,Validators.required],
    amount :['',[Validators.required,Validators.min(1)]],
    requestedPurpose :['',Validators.required],
    status:[1]
     
  });
}

//====================================================================================================
 Submit() {
    if (this.CrowdFundingMilestoneForm.valid) {
       this.crowdFundingMilestoneService.Create(this.CrowdFundingMilestoneForm?.value)
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
      Object.keys(this.CrowdFundingMilestoneForm.controls).forEach(field => {
        const control = this.CrowdFundingMilestoneForm.controls[field];
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


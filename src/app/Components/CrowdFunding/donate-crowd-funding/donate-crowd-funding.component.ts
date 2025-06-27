import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate-crowd-funding',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './donate-crowd-funding.component.html',
  styleUrl: './donate-crowd-funding.component.css'
})
export class DonateCrowdFundingComponent {
DonateForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private CrowdFundingService:CrowdFundingService,
public dialogRef: MatDialogRef<DonateCrowdFundingComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.DonateForm = fb.group({
    crowdFundingId:[this.Data.id,Validators.required],
    applicationUserId :[this.userId,Validators.required],
    amount :['',[Validators.required,Validators.min(1)]],
    comment :[''],
    isVisible :[true],
    
  });
}

//====================================================================================================
 Submit() {
    if (this.DonateForm.valid) {
     this.dialogRef.close(this.DonateForm?.value);
    }
    else {
      Object.keys(this.DonateForm.controls).forEach(field => {
        const control = this.DonateForm.controls[field];
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


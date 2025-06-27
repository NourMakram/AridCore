import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Expertise } from '../../../Models/Expertise';
import { ExpertiseService } from '../../../Services/expertise.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserExpertiseService } from '../../../Services/user-expertise.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-expertise',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-user-expertise.component.html',
  styleUrl: './edit-user-expertise.component.css'
})
export class EditUserExpertiseComponent {
 UserExpertiseForm:FormGroup;
  userId:any;
  id:any;
constructor(private fb:FormBuilder,private expertiseService:ExpertiseService ,
  private userExpertiseService:UserExpertiseService ,private activeRouter:ActivatedRoute,
  private TokenService:TokenServiceService, public dialogRef: MatDialogRef<EditUserExpertiseComponent>,
     @Inject(MAT_DIALOG_DATA) public Data: {id:number}){
  this.userId = this.TokenService.GetUserId();
   this.UserExpertiseForm = this.fb.group({
    id:[this.Data.id],
    expertiseId :['',Validators.required],
    applicationUserId:[this.userId,Validators.required] 
   });
   this.GetExpertises();
    
    if (this.Data.id != 0) {
      this.Get(this.Data.id);
    }

  
}
//============================================================================================= 
Submit() {
  if (this.UserExpertiseForm.valid) {
     this.userExpertiseService.Create(this.UserExpertiseForm.value).subscribe({
      next: () => {
       this.dialogRef.close(true);
      },
      error: (error) => {
               this.dialogRef.close(false);

        console.log(error);
      }
    })
  }
  else {
    Object.keys(this.UserExpertiseForm.controls).forEach(field => {
      const control = this.UserExpertiseForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

}
//===========================================================================
Expertises:Expertise[]=[];
GetExpertises(){
  this.expertiseService.GetList().subscribe({
    next:(value)=>{
      this.Expertises=value;
    }
  })
}
//================================================================================
Get(id:number){
  this.userExpertiseService.Get(id).subscribe({
    next:(value)=>{
      this.UserExpertiseForm.patchValue({
        id:value.id,
        expertiseId:value.expertiseId,
        applicationUserId:value.applicationUserId
      })
    }
  })
}
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
}

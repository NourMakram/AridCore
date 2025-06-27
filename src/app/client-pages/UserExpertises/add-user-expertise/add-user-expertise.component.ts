import { Component, Inject } from '@angular/core';
import { Expertise } from '../../../Models/Expertise';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserSkillService } from '../../../Services/user-skill.service';
import { ExpertiseService } from '../../../Services/expertise.service';
import { Router, RouterLink } from '@angular/router';
import { UserExpertiseService } from '../../../Services/user-expertise.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-expertise',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-user-expertise.component.html',
  styleUrl: './add-user-expertise.component.css'
})
export class AddUserExpertiseComponent {
  UserExpertiseForm:FormGroup;
  userId:any;
constructor(private fb:FormBuilder,private expertiseService:ExpertiseService ,
  private userExpertiseService:UserExpertiseService ,
  private TokenService:TokenServiceService, public dialogRef: MatDialogRef<AddUserExpertiseComponent>,
   @Inject(MAT_DIALOG_DATA) public Data: {}){
  this.userId = this.TokenService.GetUserId();
   this.UserExpertiseForm = this.fb.group({
    expertiseId :['',Validators.required],
    applicationUserId:[this.userId,Validators.required] 
   });
   this.GetExpertises();
 
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
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
}

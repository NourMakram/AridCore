import { Component, Inject } from '@angular/core';
import { SkillsService } from '../../../Services/skills.service';
import { UserSkillService } from '../../../Services/user-skill.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { Skill } from '../../../Models/Skill';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-skills',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-user-skills.component.html',
  styleUrl: './add-user-skills.component.css'
})
export class AddUserSkillsComponent {
  UserSkillForm:FormGroup;
  userId:any;
constructor(private fb:FormBuilder,private SkillsService:SkillsService ,
  private UserSkillsService:UserSkillService ,
  private TokenService:TokenServiceService, public dialogRef: MatDialogRef<AddUserSkillsComponent>,
   @Inject(MAT_DIALOG_DATA) public Data: {}){
  this.userId = this.TokenService.GetUserId();
   this.UserSkillForm = this.fb.group({
    skillId :['',Validators.required],
    applicationUserId:[this.userId,Validators.required] 
   });
   this.GetSkills();
 
}
//============================================================================================= 
Submit() {
  if (this.UserSkillForm.valid) {
     this.UserSkillsService.Create(this.UserSkillForm.value).subscribe({
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
    Object.keys(this.UserSkillForm.controls).forEach(field => {
      const control = this.UserSkillForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

}
//===========================================================================
Skills:Skill[]=[];
GetSkills(){
  this.SkillsService.GetList().subscribe({
    next:(value)=>{
      this.Skills=value;
    }
  })
}
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
}

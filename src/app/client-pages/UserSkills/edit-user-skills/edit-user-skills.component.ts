import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../../Models/Skill';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserSkillService } from '../../../Services/user-skill.service';
import { SkillsService } from '../../../Services/skills.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-skills',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-user-skills.component.html',
  styleUrl: './edit-user-skills.component.css'
})
export class EditUserSkillsComponent {
 UserSkillForm:FormGroup;
  userId:any;
  id:any;
constructor(private fb:FormBuilder,private SkillsService:SkillsService ,
  private UserSkillsService:UserSkillService ,private activeRouter:ActivatedRoute,
  private TokenService:TokenServiceService,  public dialogRef: MatDialogRef<EditUserSkillsComponent>,
     @Inject(MAT_DIALOG_DATA) public Data: {id:number}){
  this.userId = this.TokenService.GetUserId();
   this.UserSkillForm = this.fb.group({
    id:[this.Data.id],
    skillId :['',Validators.required],
    applicationUserId:[this.userId,Validators.required] 
   });

   this.GetSkills();
   
   
    if (this.Data.id != 0) {
      this.Get(this.Data.id);

    }

  
}
//============================================================================================= 
Submit() {
  if (this.UserSkillForm.valid) {
     this.UserSkillsService.Edit(this.UserSkillForm.value).subscribe({
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
//===========================================================================
Get(id:number){
  this.UserSkillsService.Get(id).subscribe({
    next:(value)=>{
      this.UserSkillForm.patchValue({
        id:value.id,
        skillId:value.skillId,
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

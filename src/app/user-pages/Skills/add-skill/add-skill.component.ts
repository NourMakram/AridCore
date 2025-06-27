import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SkillsService } from '../../../Services/skills.service';
import { GenaricModel } from '../../../Models/GenaricModel';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-skill',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
SkillsForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private SkillService:SkillsService,private TokenService:TokenServiceService) {
    this.SkillsForm = this.fb.group({
      id:['0'],
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      skillCategoryType: ['', Validators.required],
      applicationUserId:[this.TokenService.GetUserId()]
     });
     this.getkillCategoryTypes();

   }
  //==============================================================================
  Submit() {
    if (this.SkillsForm.valid) {
      console.log(this.SkillsForm.value)
      this.SkillService.Create(this.SkillsForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/Skills");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.SkillsForm.controls).forEach(field => {
        const control = this.SkillsForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  //=====================================================================================
  skillCategoryTypes:GenaricModel[]=[];
  getkillCategoryTypes(){
this.SkillService.SkillCategoryTypes().subscribe({
  next:(value)=>{
    this.skillCategoryTypes = value;
  }
  })
  }
}

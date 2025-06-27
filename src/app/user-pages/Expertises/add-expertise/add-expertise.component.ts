import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { SkillsService } from '../../../Services/skills.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { ExpertiseService } from '../../../Services/expertise.service';
import { SpecialityService } from '../../../Services/speciality.service';
import { speciality } from '../../../Models/speciality';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expertise',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-expertise.component.html',
  styleUrl: './add-expertise.component.css'
})
export class AddExpertiseComponent {
  ExpertisesForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private SpecialityService: SpecialityService, 
    private expertiseService:ExpertiseService,private TokenService:TokenServiceService) {
    this.ExpertisesForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      specialityId: ['', Validators.required],
      userId:[this.TokenService.GetUserId()]
     });
     this.getSpecialites();

   }
  //==============================================================================
  Submit() {
    if (this.ExpertisesForm.valid) {
      console.log(this.ExpertisesForm.value)
      this.expertiseService.Create(this.ExpertisesForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/Expertises");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.ExpertisesForm.controls).forEach(field => {
        const control = this.ExpertisesForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  //=====================================================================================
  Specialites:speciality[]=[];
  getSpecialites(){
    this.SpecialityService.GetSpecialites().subscribe({
    next:(value)=>{
    this.Specialites = value;
    }
    })
  }
}

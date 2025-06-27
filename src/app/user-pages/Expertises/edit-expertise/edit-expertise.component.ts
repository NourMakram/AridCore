import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { speciality } from '../../../Models/speciality';
import { ExpertiseService } from '../../../Services/expertise.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { SpecialityService } from '../../../Services/speciality.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-expertise',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-expertise.component.html',
  styleUrl: './edit-expertise.component.css'
})
export class EditExpertiseComponent {
 ExpertisesForm!: FormGroup;
 id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private SpecialityService: SpecialityService,private activeRouter:ActivatedRoute,
    private expertiseService:ExpertiseService,private TokenService:TokenServiceService) {
    this.ExpertisesForm = this.fb.group({
      id:[''],
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      specialityId: ['', Validators.required],
      userId:[this.TokenService.GetUserId()]
     });
     this.getSpecialites();
     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);
      }

    });
   }
  //==============================================================================
  Submit() {
    if (this.ExpertisesForm.valid) {
      console.log(this.ExpertisesForm.value)
      this.expertiseService.Edit(this.ExpertisesForm.value).subscribe({
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
  //========================================================================================
  Get(id:number){
    this.expertiseService.Get(id).subscribe({
      next:(value)=>{
        this.ExpertisesForm.patchValue({
          id:value.id,
          name: value.name,
          specialityId: value.specialityId,
          userId:value.userId
        });
      }
    });
    
     }
}

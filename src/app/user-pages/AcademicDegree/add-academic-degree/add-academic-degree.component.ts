import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CityService } from '../../../Services/city.service';
import { Router, RouterLink } from '@angular/router';
import { AcademicDegreeService } from '../../../Services/academic-degree.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-academic-degree',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-academic-degree.component.html',
  styleUrl: './add-academic-degree.component.css'
})
export class AddAcademicDegreeComponent {
  AcademicDegreeForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private AcademicDegreeService:AcademicDegreeService) {
    this.AcademicDegreeForm = this.fb.group({
      arDegreeName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enDegreeName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
     });
   }
  //==============================================================================
  Submit() {
    if (this.AcademicDegreeForm.valid) {
      // let Data = this.ConvertData();
      this.AcademicDegreeService.Create(this.AcademicDegreeForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/AcademicDegrees");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.AcademicDegreeForm.controls).forEach(field => {
        const control = this.AcademicDegreeForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //=============================================================================
   
  
   
}

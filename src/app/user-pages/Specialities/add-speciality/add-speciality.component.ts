import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialityService } from '../../../Services/speciality.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-speciality',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-speciality.component.html',
  styleUrl: './add-speciality.component.css'
})
export class AddSpecialityComponent {
  specialityForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private specialityService: SpecialityService) {
    this.specialityForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enSpecialityName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]]
    });
  }
  //==============================================================================
  Submit() {
    if (this.specialityForm.valid) {
      this.specialityService.Create(this.specialityForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/specialities");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.specialityForm.controls).forEach(field => {
        const control = this.specialityForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
}

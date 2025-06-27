import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialityService } from '../../../Services/speciality.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { speciality } from '../../../Models/speciality';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-speciality',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-speciality.component.html',
  styleUrl: './edit-speciality.component.css'
})
export class EditSpecialityComponent {
  specialityForm!: FormGroup;
  id: any;
  constructor(private fb: FormBuilder, private Router: Router, private activeRouter: ActivatedRoute,
    private specialityService: SpecialityService) {
    this.specialityForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enSpecialityName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
      id:[this.id]
    });
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.get(this.id);
      }

    });
    
  }
  //==============================================================================
  Submit() {
    if (this.specialityForm.valid) {
      this.specialityService.Edit(this.specialityForm.value).subscribe({
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
  //=========================================================================================
  speciality: speciality = {} as speciality;
  get(id: number) {
    this.specialityService.Get(id).subscribe({
      next: (value) => {
        this.speciality = value;
        this.specialityForm.patchValue({
          name: this.speciality.name,
          id: this.speciality.id,
          enSpecialityName: this.speciality.enSpecialityName
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

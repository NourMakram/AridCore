import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PositionTypeService } from '../../../Services/position-type.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-position-types',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-position-types.component.html',
  styleUrl: './add-position-types.component.css'
})
export class AddPositionTypesComponent {
  PositionTypeForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private PositionTypeService:PositionTypeService) {
    this.PositionTypeForm = this.fb.group({
      arPositionName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enPositionName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
     });
   }
  //==============================================================================
  Submit() {
    if (this.PositionTypeForm.valid) {
      // let Data = this.ConvertData();
      this.PositionTypeService.Create(this.PositionTypeForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/PositionTypes");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.PositionTypeForm.controls).forEach(field => {
        const control = this.PositionTypeForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //=============================================================================
   
}

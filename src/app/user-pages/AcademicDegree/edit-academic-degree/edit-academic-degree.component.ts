import { Component } from '@angular/core';
import { AcademicDegreeService } from '../../../Services/academic-degree.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-academic-degree',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-academic-degree.component.html',
  styleUrl: './edit-academic-degree.component.css'
})
export class EditAcademicDegreeComponent {
  AcademicDegreeForm!: FormGroup;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private AcademicDegreeService:AcademicDegreeService, private activeRouter:ActivatedRoute) {
    this.AcademicDegreeForm = this.fb.group({
      id:[''],
      arDegreeName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enDegreeName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
     });

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);

      }

    });
  
   }
  //==============================================================================
  Submit() {
    if (this.AcademicDegreeForm.valid) {
      // let Data = this.ConvertData();
      this.AcademicDegreeService.Edit(this.AcademicDegreeForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/AcademicDegrees");
        },
        error: (error: any) => {
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
 Get(id:number){
this.AcademicDegreeService.Get(id).subscribe({
  next:(value)=>{
    this.AcademicDegreeForm.patchValue({
      id:value.id,
      arDegreeName: value.arDegreeName,
      enDegreeName: value.enDegreeName,
    });
  }
});

 }

}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PositionTypeService } from '../../../Services/position-type.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-position-types',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-position-types.component.html',
  styleUrl: './edit-position-types.component.css'
})
export class EditPositionTypesComponent {
  PositionTypeForm!: FormGroup;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private PositionTypeService:PositionTypeService,private activeRouter:ActivatedRoute) {
    this.PositionTypeForm = this.fb.group({
      id:[''],
      arPositionName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enPositionName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
      isApproved:['']
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
    if (this.PositionTypeForm.valid) {
      // let Data = this.ConvertData();
      this.PositionTypeService.Edit(this.PositionTypeForm.value).subscribe({
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
     
 Get(id:number){
  this.PositionTypeService.Get(id).subscribe({
    next:(value)=>{
      this.PositionTypeForm.patchValue({
        id:value.id,
        arPositionName: value.arPositionName,
        enPositionName: value.enPositionName,
      });
    }
  });
  
   }
}

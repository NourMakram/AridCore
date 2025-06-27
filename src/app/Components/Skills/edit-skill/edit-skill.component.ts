import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { SkillsService } from '../../../Services/skills.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.css'
})
export class EditSkillComponent {
SkillsForm!: FormGroup;
id:any;
  constructor(private fb: FormBuilder, private Router: Router,private activeRouter:ActivatedRoute,
    private SkillService:SkillsService,private TokenService:TokenServiceService) {
    this.SkillsForm = this.fb.group({
      id:[''],
      name: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      skillCategoryType: ['', Validators.required],
      applicationUserId:[this.TokenService.GetUserId()]
     });
     this.getkillCategoryTypes();
     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);
      }

    });
   }
  //==============================================================================
  Submit() {
    if (this.SkillsForm.valid) {
      console.log(this.SkillsForm.value)
      this.SkillService.Edit(this.SkillsForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/deshboard/Skills");
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
  //=====================================================================================
     Get(id:number){
      this.SkillService.Get(id).subscribe({
        next:(value)=>{
          this.SkillsForm.patchValue({
            id:value.id,
            name: value.name,
            applicationUserId: value.applicationUserId,
            skillCategoryType:value.skillCategoryType
          });
        }
      });
      
       }
  //================================================================================
  swalWithBootstrapButtons: any = Swal.mixin({
        customClass: {
          confirmButton: "btn text-white px-3 mx-2",
          cancelButton: "btn text-white px-3 mx-2"
        },
        buttonsStyling: true
      });
      NotificationMessage(title: string, icon: string) {
        this.swalWithBootstrapButtons.fire({
          title: title,
          icon: icon,
          showConfirmButton: false,
          timer: 3000
    
        });
      }
  
  
}

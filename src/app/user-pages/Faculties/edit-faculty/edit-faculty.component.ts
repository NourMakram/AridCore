import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CityService } from '../../../Services/city.service';
import { FacultyService } from '../../../Services/faculty.service';
import { SpecialityService } from '../../../Services/speciality.service';
import { UniversityService } from '../../../Services/university.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-faculty',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-faculty.component.html',
  styleUrl: './edit-faculty.component.css'
})
export class EditFacultyComponent {
AddForm: FormGroup;
id:any;
  constructor(private fb: FormBuilder, private citiesService: CityService,private activeRouter:ActivatedRoute,
    private universityService: UniversityService, private specialityService: SpecialityService,
    private facultyService: FacultyService, private Router: Router) {
    this.AddForm = fb.group({
      id:[this.id],
      arFacultyName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      enFacultyName: ['', [Validators.required,Validators.pattern(/^[A-Za-z\s]+$/) ]],
      specialityId: ['', Validators.required],
      cityId: ['', Validators.required],
      universityId: ['', Validators.required],
      hasPostGraduation: [false, Validators.required],
      isIndexed:[false]
    });
    this.GetCitites();
    this.Getspecitites();
    this.GetUniversities();
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.get(this.id);
      }

    });

  }
  //======================================================================================================
  Citites: any[] = [];
  GetCitites() {
   this.citiesService.GetCities().subscribe({
     next: (value) => {
       this.Citites = value;
     },
     error: (error) => {
       console.log(error)
     }
   });
  }
  //======================================================================================================
  Universities: any[] = [];
  GetUniversities() {
   this.universityService.GetUniversites().subscribe({
     next: (value) => {
       this.Universities = value;
     },
     error: (error) => {
       console.log(error)
     }
   });
  }
  //======================================================================================================
  specitites: any[] = [];
  Getspecitites() {
   this.specialityService.GetSpecialites().subscribe({
     next: (value) => {
       this.specitites = value;
     },
     error: (error) => {
       console.log(error)
     }
   });
  }
  //==============================================================================
  Submit() {
   if (this.AddForm.valid) {
     //let Data = this.ConvertData();
     this.facultyService.Edit(this.AddForm?.value).subscribe({
       next: () => {
         console.log("Success To Add");
         this.Router.navigateByUrl("/userPage/faculties");
       },
       error: (error) => {
         console.log(error);
       }
     })
   }
   else {
     Object.keys(this.AddForm.controls).forEach(field => {
       const control = this.AddForm.controls[field];
       control.markAsTouched({ onlySelf: true });
     });
   }

  }
  //===========================================================================
  get(id:number){
    this.facultyService.Get(id).subscribe({
      next:(value)=>{
       if(value!=null){
        this.AddForm.patchValue({
         id: value.id,
  arFacultyName : value.arFacultyName,
  enFacultyName: value.enFacultyName,
  hasPostGraduation: value.hasPostGraduation,
  universityId: value.universityId,
  specialityId: value.specialityId,
  cityId: value.cityId,
  isIndexed: value.isIndexed,

        });
       }
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  
}

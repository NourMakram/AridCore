import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AcademicDegree } from '../../../Models/AcademicDegree';
import { Faculty } from '../../../Models/Faculty';
import { University } from '../../../Models/University';
import { AcademicDegreeService } from '../../../Services/academic-degree.service';
import { EducationalLevelService } from '../../../Services/educational-level.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { CountryService } from '../../../Services/country.service';
import { FacultyService } from '../../../Services/faculty.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { speciality } from '../../../Models/speciality';
import { SpecialityService } from '../../../Services/speciality.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-educational-level',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-educational-level.component.html',
  styleUrl: './edit-educational-level.component.css'
})
export class EditEducationalLevelComponent {
EducationalLevelForm: FormGroup;
  userId:any;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private educationalLevelService:EducationalLevelService,
    private TokenService:TokenServiceService,
    private CountryService:CountryService,
    private universityService:UniversityService,
    private FacultyService:FacultyService,
    private activeRouter:ActivatedRoute,
    private SpecialityService:SpecialityService,
    private academicDegreeService:AcademicDegreeService) {
      this.userId = this.TokenService.GetUserId();
    this.EducationalLevelForm = this.fb.group({
      id:[''],
      applicationUserId:[this.userId],
      academicDegreeId:['',Validators.required],
      arCertificateName:['',[
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(100)
      ]],
      enCertificateName:['',[
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(100)
            ]],
      facultyId:['',Validators.required],
      universityId:['',Validators.required],
      fromYear:['',Validators.required],
      toYear:['',Validators.required],
      countryId:['',Validators.required],
      specialityId:['',Validators.required],
      arDescription: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
      enDescription: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
     });

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Get(this.id);

    });
     this.GetCountries();
     this.GetFaculties();
     this.GetUniversities();
     this.GetAcademicDegrees();
     this.getSpecialites();
   }
  //==============================================================================
  Submit() {
    if (this.EducationalLevelForm.valid) {
      this.educationalLevelService.Edit(this.EducationalLevelForm.value).subscribe({
        next: () => {
let Message = "تم  تحديث البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/clientPage/EducationalLevel");
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء تحديث البيانات  حاول مرة اخري";
          this.NotificationMessage(Message, "error");


        }
      })
    }
    else {
      Object.keys(this.EducationalLevelForm.controls).forEach(field => {
        const control = this.EducationalLevelForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //=============================================================================
  Countries: any[] = [];
  GetCountries() {
    this.CountryService.GetCountries().subscribe({
      next: (value) => {
        this.Countries = value;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
 
  //=============================================================================
  Universities: University[] = [];
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
  //=============================================================================
  Faculties: Faculty[] = [];
  GetFaculties() {
   this.FacultyService.GetFaculties().subscribe({
     next: (value) => {
       this.Faculties = value;
     },
     error: (error) => {
       console.log(error)
     }
   });
  } 
  //=============================================================================
  AcademicDegrees:AcademicDegree[] = [];
 GetAcademicDegrees(){
  this.academicDegreeService.GetAll(1,100).subscribe({
    next: (value) => {
      this.AcademicDegrees = value.data;
    },
    error: (error) => {
      console.log(error)
    }
  });
}
//=============================================================================
Specialites:speciality[]=[];
  getSpecialites(){
    this.SpecialityService.GetSpecialites().subscribe({
    next:(value)=>{
    this.Specialites = value;
    }
    })
  }
  //==================================================================================================
  Get(id:number){
    this.educationalLevelService.Get(id).subscribe({
      next:(value)=>{
        this.EducationalLevelForm.patchValue({
          id:value.id,
          enDescription:value.enDescription,
          arDescription:value.arDescription,
          countryId:value.countryId,
          toYear:value.toYear,
          fromYear:value.fromYear,
          universityId:value.universityId,
          facultyId:value.facultyId,
          specialityId:value.specialityId,
          enCertificateName:value.enCertificateName,
          academicDegreeId:value.academicDegreeId,
          arCertificateName:value.arCertificateName,
        });
      }
    })
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

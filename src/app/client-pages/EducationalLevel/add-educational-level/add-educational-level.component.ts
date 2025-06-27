import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicDegreeService } from '../../../Services/academic-degree.service';
import { EducationalLevelService } from '../../../Services/educational-level.service';
import { Faculty } from '../../../Models/Faculty';
import { PositionType } from '../../../Models/PositionType';
import { University } from '../../../Models/University';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { Router, RouterLink } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { FacultyService } from '../../../Services/faculty.service';
import { AcademicDegree } from '../../../Models/AcademicDegree';
import { SpecialityService } from '../../../Services/speciality.service';
import { speciality } from '../../../Models/speciality';
import { min } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-educational-level',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-educational-level.component.html',
  styleUrl: './add-educational-level.component.css'
})
export class AddEducationalLevelComponent {
  EducationalLevelForm: FormGroup;
  userId:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private educationalLevelService:EducationalLevelService,
    private TokenService:TokenServiceService,
    private CountryService:CountryService,
    private universityService:UniversityService,
    private FacultyService:FacultyService,
    private SpecialityService:SpecialityService,
    private academicDegreeService:AcademicDegreeService) {
      this.userId = this.TokenService.GetUserId();
    this.EducationalLevelForm = this.fb.group({
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

     this.GetCountries();
     this.GetFaculties();
     this.GetUniversities();
     this.GetAcademicDegrees();
     this.getSpecialites();
   }
  //==============================================================================
  Submit() {
    if (this.EducationalLevelForm.valid) {
      // let Data = this.ConvertData();
      this.educationalLevelService.Create(this.EducationalLevelForm.value).subscribe({
        next: () => {
let Message = "تم  اضافة البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
                    this.Router.navigateByUrl("/clientPage/EducationalLevel");
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء اضافة البيانات  حاول مرة اخري";
          this.NotificationMessage(Message, "error");

          console.log(error);
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
//=============================================================================
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

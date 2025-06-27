import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicPositionService } from '../../../Services/academic-position.service';
import { Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../../Services/token-service.service';
import { University } from '../../../Models/University';
import { Faculty } from '../../../Models/Faculty';
import { PositionType } from '../../../Models/PositionType';
import { CityService } from '../../../Services/city.service';
import { CountryService } from '../../../Services/country.service';
import { FacultyService } from '../../../Services/faculty.service';
import { PositionTypeService } from '../../../Services/position-type.service';
import { UniversityService } from '../../../Services/university.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-academic-position',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-academic-position.component.html',
  styleUrl: './add-academic-position.component.css'
})

export class AddAcademicPositionComponent {
  AcademicPositionForm: FormGroup;
  userId:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private academicPositionService:AcademicPositionService,
    private TokenService:TokenServiceService,
  private cityService:CityService,
private CountryService:CountryService,
private universityService:UniversityService,
private FacultyService:FacultyService,
private PositionTypeService:PositionTypeService) {
      this.userId = this.TokenService.GetUserId();

    this.AcademicPositionForm = this.fb.group({
      Indx:[1],
      applicationUserId:[this.userId],
      positionTypeId:['',Validators.required],
      facultyId:['',Validators.required],
      universityId:['',Validators.required],
      countryId:['',Validators.required],
      cityId:['',Validators.required],
      fromYear:['',Validators.required],
      toYear:['',Validators.required],
      arDescription: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enDescription: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
     });

     this.GetCitites();
     this.GetCountries();
     this.GetFaculties();
     this.GetUniversities();
     this.GetPositionTypes();
   }
  //==============================================================================
  Submit() {
    if (this.AcademicPositionForm.valid) {
      // let Data = this.ConvertData();
      this.academicPositionService.Create(this.AcademicPositionForm.value).subscribe({
        next: () => {
            let Message = "تم  اضافة البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/clientPage/AcademicPosition");
        },
        error: (error) => {
           let Message = "حدث خطأ اثناء حذف البيانات  حاول مرة اخري";
                       this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.AcademicPositionForm.controls).forEach(field => {
        const control = this.AcademicPositionForm.controls[field];
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
 Citites: any[] = [];
  GetCitites() {
   this.cityService.GetCities().subscribe({
     next: (value) => {
       this.Citites = value;
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
  positionTypes:PositionType[] = [];
 GetPositionTypes(){
  this.PositionTypeService.GetAll(1,100).subscribe({
    next: (value) => {
      this.positionTypes = value.data;
    },
    error: (error) => {
      console.log(error)
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

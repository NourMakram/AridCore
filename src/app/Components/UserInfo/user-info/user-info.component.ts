import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CityService } from '../../../Services/city.service';
import { CountryService } from '../../../Services/country.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { FacultyService } from '../../../Services/faculty.service';
import { UserModel } from '../../../Models/UserModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  IsAuthenticated$;
  UpdateForm: FormGroup;
  userId:string|null=null;
  constructor(private TokenService: TokenServiceService, private authService: AuthService,
    private fb: FormBuilder,
    private citiesService: CityService, private countryService: CountryService, private universityService: UniversityService,
    private FacultyService: FacultyService
  ) {
    this.IsAuthenticated$ = this.TokenService.IsAuthentication;
    this.UpdateForm = fb.group({
      arName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)] ],
      enName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      otherNames: [''],
      dateofBirth: [''],
      gender: [''],
      secondEmail: ['',Validators.email],
      uiLanguage: [''],
      profileImage: [''],
      cvurl: [''],
      summary: [''],
      contactMeDetail: [''],
      countryId: ['', Validators.required],
      cityId: [''],
      universityId: [''],
      facultyId: [''],
      isNotUniversity: [false],
      email: ['', [Validators.required,Validators.email]],
      phoneNumber: [''],
    });




    this.userId = this.TokenService.GetUserId();
    if (this.userId != null) {
      this.GetUser(this.userId);

    }
    this.GetCitites();
    this.GetUniversities();
    this.GetCountries();
    this.GetFaculties();

  }
  User: UserModel = {} as UserModel;
  GetUser(userId: string) {
    this.authService.GetUser(userId).subscribe({
      next: (value) => {
        this.User = value;
        this.UpdateForm.patchValue({
          arName: this.User.arName!= null ?this.User.arName : '',
          enName: this.User.enName!= null ?this.User.enName : '',
          otherNames: this.User.otherNames!= null ?this.User.otherNames : '',
          dateofBirth: this.User.dateofBirth!= null ?this.User.dateofBirth : '',
          gender: this.User.gender!= null ?this.User.gender : '',
          secondEmail: this.User.secondEmail!= null ?this.User.secondEmail : '',
          uiLanguage: this.User.uiLanguage!= null ?this.User.uiLanguage : '',
          profileImage: this.User.profileImage!= null ?this.User.profileImage : '',
          cvurl: this.User.cvurl!= null ?this.User.cvurl : '',
          summary: this.User.summary!= null ?this.User.summary : '',
          contactMeDetail: this.User.contactMeDetail!= null ?this.User.contactMeDetail : '',
          countryId: this.User.countryId!= null ?this.User.countryId : '',
          cityId: this.User.cityId!= null ?this.User.cityId : '',
          universityId: this.User.universityId!= null ?this.User.universityId : '',
          facultyId: this.User.facultyId!= null ?this.User.facultyId : '',
          isNotUniversity: this.User.isNotUniversity!=null? this.User.isNotUniversity :false ,
          email: this.User.email!= null ?this.User.email : '',
          phoneNumber: this.User.phoneNumber!= null ?this.User.phoneNumber : '',
        })
      }
      ,
      error: (error) => {
        console.log(error)
      }
    })
  }
  //====================================================================================
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
  //===================================================================================================
  Countries: any[] = [];
  GetCountries() {
    this.countryService.GetCountries().subscribe({
      next: (value) => {
        this.Countries = value;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  //===================================================================================================
  Faculties: any[] = [];
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
  //===================================================================================================
  Submit(){
    if (this.UpdateForm.valid) {
      let Data = this.ConvertData();
      this.authService.UpdateInfo(Data).subscribe({
        next: () => {
 let Message = "تم  تحديث البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          if(this.userId){
            this.GetUser(this.userId);

          }
        },
        error: (error) => {
           let Message = "حدث خطأ اثناء تحديث البيانات  حاول مرة اخري";
                       this.NotificationMessage(Message, "error");
        }
      })
    }
    else {
      Object.keys(this.UpdateForm.controls).forEach(field => {
        const control = this.UpdateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
//============================================================================================
ConvertData() {
  let formData = new FormData();
  if(this.userId!=null){
    formData.append('id', this.userId);

  }
  formData.append('arName', this.UpdateForm.get('arName')?.value);
  formData.append('enName', this.UpdateForm.get('enName')?.value);
  formData.append('otherNames', this.UpdateForm.get('otherNames')?.value);
  formData.append('dateofBirth', this.UpdateForm.get('dateofBirth')?.value);
  formData.append('gender', this.UpdateForm.get('gender')?.value);
  formData.append('secondEmail', this.UpdateForm.get('secondEmail')?.value);
  formData.append('phoneNumber', this.UpdateForm.get('phoneNumber')?.value);
  formData.append('email', this.UpdateForm.get('email')?.value);
  formData.append('uILanguage', this.UpdateForm.get('uILanguage')?.value);
  formData.append('countryId', this.UpdateForm.get('countryId')?.value);
  formData.append('cityId', this.UpdateForm.get('cityId')?.value);
  formData.append('universityId', this.UpdateForm.get('universityId')?.value);
  formData.append('facultyId', this.UpdateForm.get('facultyId')?.value);
  formData.append('isNotUniversity', this.UpdateForm.get('isNotUniversity')?.value);
  if (this.FileUrl) {
    formData.append('profileImagePath',this.FileUrl);

  }
  return formData;
}
//==============================================================================
FileUrl: File | undefined = undefined;
OnchangeFile(e: any) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.FileUrl = input.files[0];
    console.log(this.FileUrl)
  }

}

//=======================================================
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



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../Services/address.service';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { FacultyService } from '../../../Services/faculty.service';
import { CountryService } from '../../../Services/country.service';
import { CityService } from '../../../Services/city.service';
import { University } from '../../../Models/University';
import { Faculty } from '../../../Models/Faculty';
import { Country } from '../../../Models/Country';
import { City } from '../../../Models/City';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
  AddressForm: FormGroup;
  userId: any;
  RoleName:any;
  constructor(private fb: FormBuilder, private AddressService: AddressService,
    private AuthService: AuthService, private TokenService: TokenServiceService,
  private univercityService:UniversityService,private facultyService:FacultyService,
private countyService:CountryService,private cityService:CityService,private Router:Router) {
    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.AddressForm = this.fb.group({
      fullAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addressSaveName: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      arName: ['', Validators.required],
      enName: ['', Validators.required],
      applicationUserId: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      universityId: ['', Validators.required],
      facultyId: ['', Validators.required],
    });

    if(this.userId !=undefined){
      this.Get(this.userId);
    }
    this.GetCities();
    this.GetCountries();
    this.GetUnivercity();
    this.GetFacutly();
  }
  //================================================================================================
 Submit() {
    if (this.AddressForm.valid) {
       this.AddressService.Create(this.AddressForm.value)
        .subscribe({
          next: () => {
          let Message = "تم اضافة البيانات بنجاح";
              this.NotificationMessage(Message, "success");
              this.GoBack();
         },
        error: (error) => {
           let Message = "فشل اضافة البيانات حاول مرة اخري";
              this.NotificationMessage(Message, "error");
          console.log(error);
        }
        })
    }
    else {
      Object.keys(this.AddressForm.controls).forEach(field => {
        const control = this.AddressForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  
  //================================================================================================
  Get(userId: string) {
    this.AuthService.GetUser(userId).subscribe({
      next: (value) => {
        if (value != null) {
          console.log(value);
          this.AddressForm.patchValue({
            phoneNumber: value.phoneNumber != null ? value.phoneNumber : '',
            arName: value.arName != null ? value.arName : '',
            enName: value.enName != null ? value.enName : '',
            applicationUserId: value.id,
            countryId: value.countryId != null ? value.countryId : '',
            cityId: value.cityId != null ? value.cityId : '',
            universityId: value.universityId != null ? value.universityId : '',
            facultyId: value.facultyId != null ? value.facultyId : '',
          });
        }
      }
    })
  }
  //================================================================================================
  Universities:University[]=[];
  GetUnivercity(){
this.univercityService.GetUniversites().subscribe({
  next:(value)=>{
    this.Universities = value;
  }
})
  }
  //================================================================================================
  Faculties:Faculty[]=[];
   GetFacutly(){
this.facultyService.GetFaculties().subscribe({
  next:(value)=>{
    this.Faculties = value;
  }
})
  }
  //================================================================================================
  countries:any[]=[];
 GetCountries(){
this.countyService.GetCountries().subscribe({
  next:(value)=>{
    this.countries = value;
  }
})
  }
   //================================================================================================
   cities:City[]=[];
 GetCities(){
this.cityService.GetCities().subscribe({
  next:(value)=>{
    this.cities = value;
  }
})
  }

   //==================================================================================================
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
    //==================================================================================================
   GoBack(){
  
       if(this.RoleName != null){
  
        if(this.RoleName == "Member"){
            
          this.Router.navigateByUrl("/clientPage/Pages/Addresses");
  
       }
       else if(this.RoleName == "Admin"){
              
            this.Router.navigateByUrl("userPage/Addresses");
  
       }
       }
    }
}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { City } from '../../../Models/City';
import { Faculty } from '../../../Models/Faculty';
import { University } from '../../../Models/University';
import { CityService } from '../../../Services/city.service';
import { CountryService } from '../../../Services/country.service';
import { FacultyService } from '../../../Services/faculty.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { AddressService } from '../../../Services/address.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressComponent {
  AddressForm: FormGroup;
  userId: any;
  RoleName:any;
  Id:any;
  constructor(private fb: FormBuilder, private AddressService: AddressService,
 private TokenService: TokenServiceService,
  private univercityService:UniversityService,private facultyService:FacultyService,
private countyService:CountryService,private cityService:CityService,private Router:Router,private activatedRoute:ActivatedRoute) {
    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.AddressForm = this.fb.group({
      id:['',Validators.required],
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

     this.activatedRoute.paramMap.subscribe(params => {
      this.Id = params.get('id');
      if (this.Id != 0) {
        this.Get(this.Id);

      }

    });
     
    this.GetCities();
    this.GetCountries();
    this.GetUnivercity();
    this.GetFacutly();
  }
  //================================================================================================
 Submit() {
    if (this.AddressForm.valid) {
       this.AddressService.Edit(this.AddressForm.value)
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
  Get(id: string) {
    this.AddressService.Get(id).subscribe({
      next: (value:any) => {
        if (value != null) {
          console.log(value);
          this.AddressForm.patchValue({
            id:value.id,
            fullAddress:value.fullAddress!= null ? value.fullAddress : '',
            addressSaveName:value.addressSaveName!= null ? value.addressSaveName : '',
            phoneNumber: value.phoneNumber != null ? value.phoneNumber : '',
            arName: value.arName != null ? value.arName : '',
            enName: value.enName != null ? value.enName : '',
            applicationUserId: value.applicationUserId,
            countryId: value.countryId != null ? value.countryId : '',
            cityId: value.cityId != null ? value.cityId : '',
            universityId: value.universityId != null ? value.universityId : '',
            facultyId: value.facultyId != null ? value.facultyId : '',
    
          });
      }
    }
    });
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

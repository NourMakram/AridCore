import { Component } from '@angular/core';
import { CountryService } from '../../../Services/country.service';
import { CityService } from '../../../Services/city.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { City } from '../../../Models/City';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-city',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css'
})
export class EditCityComponent {
  CityForm!: FormGroup;
  id: any;
  constructor(private fb: FormBuilder, private Router: Router, private activeRouter: ActivatedRoute,
    private cityService: CityService, private CountryService: CountryService) {
    this.CityForm = this.fb.group({
      arCityName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enCityName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
      countryId: ['', Validators.required],
      id: [this.id]
    });
    this.GetCities();

    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.GetCity(this.id);

      }

    });
  

  }
  //==============================================================================
  Submit() {
    if (this.CityForm.valid) {
     // let Data = this.ConvertData();
      this.cityService.Edit(this.CityForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/cities");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.CityForm.controls).forEach(field => {
        const control = this.CityForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //===========================================================================
  City: City = {} as City;
GetCity(id: number) {
    this.cityService.Get(id).subscribe({
      next: (value) => {

        this.City = value;
        if (this.City != null) {
          this.CityForm.patchValue({
            arCityName: this.City.arCityName,
            enCityName: this.City.enCityName,
            countryId: this.City.countryId,
            id: this.City.id
           });
        }

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //=============================================================================
  ConvertData() {
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('countryId', this.CityForm.get('countryId')?.value);
    formData.append('enCityName', this.CityForm.get('enCityName')?.value);
    formData.append('arCityName', this.CityForm.get('arCityName')?.value);

    return formData;
  }
  //=============================================================================
  Countries: any[] = [];
  GetCities() {
    this.CountryService.GetCountries().subscribe({
      next: (value) => {
        this.Countries = value;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}

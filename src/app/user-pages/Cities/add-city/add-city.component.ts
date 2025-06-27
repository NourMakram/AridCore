import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityService } from '../../../Services/city.service';
import { Router, RouterLink } from '@angular/router';
import { City } from '../../../Models/City';
import { CountryService } from '../../../Services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-city',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent {
  CityForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
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
    });
    this.GetCountries()
  }
  //==============================================================================
  Submit() {
    if (this.CityForm.valid) {
      // let Data = this.ConvertData();
      this.cityService.Create(this.CityForm.value).subscribe({
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
  //=============================================================================
  ConvertData() {
    let formData = new FormData();
    formData.append('countryId', this.CityForm.get('countryId')?.value);
    formData.append('enCityName', this.CityForm.get('enCityName')?.value);
    formData.append('arCityName', this.CityForm.get('arCityName')?.value);
      
    return formData;
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
}

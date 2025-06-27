import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { Country } from '../../../Models/Country';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id: any;
  countryForm!: FormGroup;
  constructor(private activeRouter: ActivatedRoute, private Router: Router, 
    private CounteryService: CountryService, private fb: FormBuilder) {

    this.countryForm = this.fb.group({
      arCountryName: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
      ]],
      enCountryName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
      shortName: ['', Validators.required],
      countryCode: ['', [Validators.required,Validators.maxLength(10)]],
      formFile: [''],
    });

    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.GetCountry(this.id);

    });
  }

  //========================================================================
  Country: Country = {} as Country;
  GetCountry(id: number) {
    this.CounteryService.Get(id).subscribe({
      next: (value) => {
        this.Country = value;
        if (this.Country != null) {
          this.countryForm.patchValue({
            arCountryName: this.Country.arCountryName,
            enCountryName: this.Country.enCountryName,
            shortName: this.Country.shortName,
            countryCode: this.Country.countryCode
          });
        }

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  //========================================================================
  Submit() {
    if (this.countryForm.valid) {
      let data = this.ConvertData();
      this.CounteryService.Edit(data).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/countries");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.countryForm.controls).forEach(field => {
        const control = this.countryForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
   
  //==============================================================================
  ConvertData() {
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('arCountryName', this.countryForm.get('arCountryName')?.value);
    formData.append('enCountryName', this.countryForm.get('enCountryName')?.value);
    formData.append('shortName', this.countryForm.get('shortName')?.value);
    formData.append('countryCode', this.countryForm.get('countryCode')?.value);
    if (this.FileUrl) {
      formData.append('formFile', this.FileUrl);

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
}

import { Component } from '@angular/core';
import { CountryService } from '../../../Services/country.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  countryForm!: FormGroup;
  constructor(private fb: FormBuilder, private Router: Router,
    private countryService: CountryService) {
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
      countryCode: ['', [Validators.required, Validators.max(10)]],
      formFile: ['', Validators.required],
    });
  }
  //==============================================================================
  Submit() {
    if (this.countryForm.valid) {
      let data = this.ConvertData();
      this.countryService.Create(data).subscribe({
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

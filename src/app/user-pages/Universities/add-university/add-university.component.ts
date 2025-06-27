import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../../Services/country.service';
import { UniversityService } from '../../../Services/university.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-university',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-university.component.html',
  styleUrl: './add-university.component.css'
})
export class AddUniversityComponent {
  AddForm: FormGroup;
  constructor(private fb: FormBuilder, private countryService: CountryService,
    private universityService: UniversityService, private Router: Router) {
    this.AddForm = fb.group({
      arUniversityName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      enUniversityName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
      ]],
      website: ['',[Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/)
      ]],
      staffNo: ['', Validators.required],
      studentNo: ['', Validators.required],
      yearofEstablishment: ['', Validators.required],
      logoPath: ['', Validators.required],
      private: [false],
      semiPrivate: [false],
      governmental: [false],
      countryId: ['', Validators.required]
    });
    this.GetCountries();
  }
//======================================================================================================
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
  //==============================================================================
  Submit() {
    if (this.AddForm.valid) {
      let Data = this.ConvertData();
      this.universityService.Create(Data).subscribe({
        next: () => {
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/universities");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.AddForm.controls).forEach(field => {
        const control = this.AddForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //============================================================================================
  ConvertData() {
    let formData = new FormData();
    formData.append('arUniversityName', this.AddForm.get('arUniversityName')?.value);
    formData.append('enUniversityName', this.AddForm.get('enUniversityName')?.value);
    formData.append('website', this.AddForm.get('website')?.value);
    formData.append('staffNo', this.AddForm.get('staffNo')?.value);
    formData.append('studentNo', this.AddForm.get('studentNo')?.value);
    formData.append('yearofEstablishment', this.AddForm.get('yearofEstablishment')?.value);
    formData.append('private', this.AddForm.get('private')?.value);
    formData.append('semiPrivate', this.AddForm.get('semiPrivate')?.value);
    formData.append('governmental', this.AddForm.get('governmental')?.value);
    formData.append('countryId', this.AddForm.get('countryId')?.value);
    if (this.FileUrl) {
      formData.append('logoPath', this.FileUrl);

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

import { Component } from '@angular/core';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { GenaricModel } from '../../../Models/GenaricModel';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-acadmic-activity',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-acadmic-activity.component.html',
  styleUrl: './add-acadmic-activity.component.css'
})
export class AddAcadmicActivityComponent {
  AcadmicActivityForm: FormGroup;
  userId: any;
  constructor(private fb: FormBuilder, private acadmicActivityService: AcadmicActivityService,
    private TokenService: TokenServiceService, private Router: Router, private CountryService: CountryService) {
    this.userId = this.TokenService.GetUserId();
    this.AcadmicActivityForm = this.fb.group({
      countryId: ['', Validators.required],
      photo: ['', Validators.required],
      language: ['', Validators.required],
      relationType: ['', Validators.required],
      activityURL: ['', [Validators.required,
      Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/)
      ]],
      activityDate: ['', Validators.required],
      enDescription: ['', Validators.required],
      arDescription: ['', Validators.required],
      enTitle: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      arTitle: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      activityType: ['', Validators.required],
      applicationUserId: [this.userId, Validators.required]
    })
    this.GetActivityTypes();
    this.GetLanguages();
    this.GetCountries();
  }
  //============================================================================================= 
  Submit() {
    if (this.AcadmicActivityForm.valid) {
      let Data = this.ConvertData();
      this.acadmicActivityService.Create(Data).subscribe({
        next: () => {
          let Message = "تم  اضافة البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/clientPage/AcadmicActivites");
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء اضافة البيانات  حاول مرة اخري";
          this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.AcadmicActivityForm.controls).forEach(field => {
        const control = this.AcadmicActivityForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //=============================================================================================
  ConvertData() {
    let Data = new FormData();
    Data.append('applicationUserId', this.userId);
    Data.append('activityType', this.AcadmicActivityForm.get('activityType')?.value);
    Data.append('arTitle', this.AcadmicActivityForm.get('arTitle')?.value);
    Data.append('enTitle', this.AcadmicActivityForm.get('enTitle')?.value);
    Data.append('arDescription', this.AcadmicActivityForm.get('arDescription')?.value);
    Data.append('enDescription', this.AcadmicActivityForm.get('enDescription')?.value);
    Data.append('activityDate', this.AcadmicActivityForm.get('activityDate')?.value);
    Data.append('activityURL', this.AcadmicActivityForm.get('activityURL')?.value);
    Data.append('relationType', this.AcadmicActivityForm.get('relationType')?.value);
    Data.append('language', this.AcadmicActivityForm.get('language')?.value);
    Data.append('countryId', this.AcadmicActivityForm.get('countryId')?.value);
    if (this.FileUrl != null) {
      Data.append('photo', this.FileUrl);

    }
    return Data;

  }

  //=============================================================================================
  FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }

  //=============================================================================================
  Languages: GenaricModel[] = [];
  GetLanguages() {
    this.acadmicActivityService.GetLanguages().subscribe({
      next: (value) => {
        this.Languages = value;
      }
    })
  }
  //=============================================================================================
  ActivityTypes: GenaricModel[] = [];
  GetActivityTypes() {
    this.acadmicActivityService.GetActivityTypes().subscribe({
      next: (value) => {
        this.ActivityTypes = value;
      }
    })
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

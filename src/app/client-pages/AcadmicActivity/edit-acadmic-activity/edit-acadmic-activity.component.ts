import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-acadmic-activity',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-acadmic-activity.component.html',
  styleUrl: './edit-acadmic-activity.component.css'
})
export class EditAcadmicActivityComponent {
 AcadmicActivityForm:FormGroup;
  userId:any;
  id:any;
constructor(private fb:FormBuilder,private acadmicActivityService:AcadmicActivityService,
  private activeRouter:ActivatedRoute,
  private TokenService:TokenServiceService, private Router:Router,private CountryService:CountryService){
  this.userId = this.TokenService.GetUserId();
   this.AcadmicActivityForm = this.fb.group({
    countryId :['',Validators.required],
    // photo:['',Validators.required],
    id:['',Validators.required],
    language :['',Validators.required],
    relationType :['',Validators.required],
    activityURL :['', [Validators.required,
      Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/)
    ]],
     activityDate  :['',Validators.required],
    enDescription :['',Validators.required],
    arDescription  :['',Validators.required],
    enTitle :['',[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/) ]],
    arTitle  :['',[Validators.required,Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
    activityType: ['',Validators.required],
    applicationUserId:[this.userId,Validators.required] 
   });

   this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);

    }

  });
  this.GetActivityTypes();
  this.GetLanguages();
  this.GetCountries();
}
//============================================================================================= 
Submit() {
  if (this.AcadmicActivityForm.valid) {
    let Data = this.ConvertData();
    this.acadmicActivityService.Edit(Data).subscribe({
      next: () => {
        console.log("Success To Add");
        let Message = "تم  تحديث البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
        this.Router.navigateByUrl("/clientPage/AcadmicActivites");
      },
      error: (error) => {
        let Message = "حدث خطأ اثناء تحديث البيانات  حاول مرة اخري";
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
 ConvertData(){
  let Data = new FormData();
  Data.append('applicationUserId',this.userId);
  Data.append('id',this.AcadmicActivityForm.get('id')?.value);
  Data.append('activityType',this.AcadmicActivityForm.get('activityType')?.value);
  Data.append('arTitle',this.AcadmicActivityForm.get('arTitle')?.value);
  Data.append('enTitle',this.AcadmicActivityForm.get('enTitle')?.value);
  Data.append('arDescription',this.AcadmicActivityForm.get('arDescription')?.value);
  Data.append('enDescription',this.AcadmicActivityForm.get('enDescription')?.value);
  Data.append('activityDate',this.AcadmicActivityForm.get('activityDate')?.value);
  Data.append('activityURL',this.AcadmicActivityForm.get('activityURL')?.value);
  Data.append('relationType',this.AcadmicActivityForm.get('relationType')?.value);
  Data.append('language',this.AcadmicActivityForm.get('language')?.value);
  Data.append('countryId',this.AcadmicActivityForm.get('countryId')?.value);
  if(this.FileUrl!=null){
    Data.append('photo',this.FileUrl);

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
Languages:GenaricModel[]=[];
GetLanguages(){
  this.acadmicActivityService.GetLanguages().subscribe({
    next:(value)=>{
      this.Languages = value;
    }
  })
}
//=============================================================================================
ActivityTypes:GenaricModel[]=[];
GetActivityTypes(){
  this.acadmicActivityService.GetActivityTypes().subscribe({
    next:(value)=>{
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
//=============================================================================
Get(id:number){
  this.acadmicActivityService.Get(id).subscribe({
    next:(value)=>{
      this.AcadmicActivityForm.patchValue({
        id:value.id,
        countryId :value.countryId,
        photo:value.photo,
        language:value.language,
        relationType:value.relationType,
        activityURL:value.activityURL,
        activityDate:value.activityDate,
        enDescription:value.enDescription,
        arDescription:value.arDescription,
        enTitle:value.enTitle,
        arTitle:value.arTitle,
        activityType: value.activityType,
        applicationUserId:value.applicationUserId
      });
    }
  })
}
//=========================================================================================
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

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { PublicationService } from '../../../Services/publication.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-publication',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-publication.component.html',
  styleUrl: './edit-publication.component.css'
})
export class EditPublicationComponent {
PublicationForm: FormGroup;
  userId:any;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,private activeRouter:ActivatedRoute,
    private TokenService:TokenServiceService,private publicationService:PublicationService
) {
      this.userId = this.TokenService.GetUserId();

    this.PublicationForm = this.fb.group({
    applicationUserId:[this.userId],
    publicationType: ['',Validators.required],
    arTitle: ['',[
      Validators.required,
      Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
    ]],
  enTitle: ['',[
    Validators.required,
    Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  arAuthors :  ['',[
    Validators.required,
    Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  enAuthors: ['',[
    Validators.required,
    Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  arAbstract: ['',[
    Validators.required,
    Validators.pattern(/^[\u0600-\u06FF\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  enAbstract: ['',[
    Validators.required,
    Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة العربية فقط
  ]],
  publicationDate: ['',Validators.required],
  publisher: ['',Validators.required],
  volumeNo: [''],
  issueNo: [''],
  issn: ['',Validators.required],
  doi:['',Validators.required],
  pages: ['',Validators.required],
  fileLink:[''],
  externalLink: ['',[Validators.required,
    Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/)
  ]],
  downloadHits: [0],
  keywords:['',Validators.required],
     });

     this.GetPublicationTypes();

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);

      }

    });
   }
  //==============================================================================
  Submit() {
    if (this.PublicationForm.valid) {
      let Data = this.ConvertData();
      this.publicationService.Edit(Data).subscribe({
        next: () => {
          console.log("Success To Add");
            let Message = "تم تعديل البيانات بنجاح";
                this.NotificationMessage(Message, "success");
           this.Router.navigateByUrl("/clientPage/Publication");
        },
        error: (error) => {
             let Message = "فشل تعديل البيانات حاول مرة اخري";
                this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.PublicationForm.controls).forEach(field => {
        const control = this.PublicationForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
//=============================================================================
  PublicationTypes:GenaricModel[] =[];
  GetPublicationTypes(){
    this.publicationService.GetPublicationTypes().subscribe({
      next:(value)=>{
        this.PublicationTypes = value;
      }
    });
  }
  //=============================================================================
  ConvertData() {
  
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('applicationUserId', this.userId);
    formData.append('publicationType', this.PublicationForm.get('publicationType')?.value);
    formData.append('arTitle', this.PublicationForm.get('arTitle')?.value);
    formData.append('enTitle', this.PublicationForm.get('enTitle')?.value);
    formData.append('enAuthors', this.PublicationForm.get('enAuthors')?.value);
    formData.append('arAuthors', this.PublicationForm.get('arAuthors')?.value);
    formData.append('arAbstract', this.PublicationForm.get('arAbstract')?.value);
    formData.append('enAbstract', this.PublicationForm.get('enAbstract')?.value);
    formData.append('publicationDate', this.PublicationForm.get('publicationDate')?.value);
    formData.append('publisher', this.PublicationForm.get('publisher')?.value);
    formData.append('volumeNo', this.PublicationForm.get('volumeNo')?.value);
    formData.append('issueNo', this.PublicationForm.get('issueNo')?.value);
    formData.append('issn', this.PublicationForm.get('issn')?.value);
    formData.append('doi', this.PublicationForm.get('doi')?.value);
    formData.append('pages', this.PublicationForm.get('pages')?.value);
    formData.append('fileLink', this.PublicationForm.get('fileLink')?.value);
    formData.append('externalLink', this.PublicationForm.get('externalLink')?.value);
    formData.append('downloadHits', this.PublicationForm.get('downloadHits')?.value);
    formData.append('keywords', this.PublicationForm.get('keywords')?.value);

    if (this.FileUrl) {
      formData.append('fileLink', this.FileUrl);

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
   //==============================================================================
   Get(id:number){
    this.publicationService.Get(id).subscribe({
      next:(value)=>{
        this.PublicationForm.patchValue({
          id:value.id,
          publicationType:value.publicationType,
          arTitle:value.arTitle,
          enTitle:value.enTitle,
          arAuthors :value.arAuthors,
          enAuthors:value.enAuthors,
          arAbstract:value.arAbstract,
          enAbstract:value.enAbstract,
          publicationDate:value.publicationDate,
          publisher:value.publisher,
          volumeNo:value.volumeNo,
          issueNo:value.issueNo,
          issn:value.issn,
          doi:value.doi,
          pages:value.pages,
          externalLink:value.externalLink,
          downloadHits:value.downloadHits,
          keywords:value.keywords,
        })
      }
    })
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

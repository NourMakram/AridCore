import { Component } from '@angular/core';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { Certificate } from '../../../Models/Certificate';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-certificate',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './details-certificate.component.html',
  styleUrl: './details-certificate.component.css'
})
export class DetailsCertificateComponent {
  id:any;
constructor(private aridCertificateService:AridCertificateService,private activeRouter:ActivatedRoute){
 this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.Get(this.id);

    });
}
//=================================================================================================
Certificate:Certificate = {} as Certificate;
Get(id:number){
  this.aridCertificateService.Details(id).subscribe(
{
  next:(value)=>{
    this.Certificate = value;
  }
}
  )
}
//=================================================================================================
PdfExportCertificate(id: number): void {
           let Message = " جارى تحميل الشهادة يرجى الأنتظار .....";
                    this.NotificationMessage(Message, "info");

    this.aridCertificateService.PdfExport(id).subscribe(
      (response: Blob) => {
         let Message = "تم تحميل الملف بنجاح";
                    this.NotificationMessage(Message, "success");
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${id}_شهادة.pdf`;  // اسم الشهادة
        link.click();
      },
      (error) => {
         let Message = "عذرا حدث مشكلة تحميل  الشهادة";
                    this.NotificationMessage(Message, "error");
        console.error('Error downloading certificate', error);
      }
    );
  }


  //============================================================================================
  PdfExportBadge(id: number): void {
    let Message = " جارى تحميل الشهادة يرجى الأنتظار .....";
                    this.NotificationMessage(Message, "info");

    this.aridCertificateService.PdfExportBadge(id).subscribe(
      (response: Blob) => {
         let Message = "تم تحميل الملف بنجاح";
                    this.NotificationMessage(Message, "success");
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${id}_شهادة.pdf`;  // اسم الشهادة
        link.click();
      },
      (error) => {
         let Message = "عذرا حدث مشكلة تحميل  الشهادة";
                    this.NotificationMessage(Message, "error");
        console.error('Error downloading certificate', error);
      }
    );
  }
   //============================================================================================
  PdfExportCertLandScap(id: number): void {
    let Message = " جارى تحميل الشهادة يرجى الأنتظار .....";
                    this.NotificationMessage(Message, "info");

    this.aridCertificateService.PdfExportCertLandScap(id).subscribe(
      (response: Blob) => {
         let Message = "تم تحميل الملف بنجاح";
                    this.NotificationMessage(Message, "success");
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${id}_شهادة.pdf`;  // اسم الشهادة
        link.click();
      },
      (error) => {
         let Message = "عذرا حدث مشكلة تحميل  الشهادة";
                    this.NotificationMessage(Message, "error");
        console.error('Error downloading certificate', error);
      }
    );
  }

   //============================================================================================
  PdfExportLetter(id: number): void {
    let Message = " جارى تحميل الشهادة يرجى الأنتظار .....";
                    this.NotificationMessage(Message, "info");

    this.aridCertificateService.PdfExportLetter(id).subscribe(
      (response: Blob) => {
         let Message = "تم تحميل الملف بنجاح";
                    this.NotificationMessage(Message, "success");
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${id}_شهادة.pdf`;  // اسم الشهادة
        link.click();
      },
      (error) => {
         let Message = "عذرا حدث مشكلة تحميل  الشهادة";
                    this.NotificationMessage(Message, "error");
        console.error('Error downloading certificate', error);
      }
    );
  }
//==============================================================================================
  PayCertificate(id:number){
    this.aridCertificateService.Pay(id).subscribe({
      next:(value)=>{
                  let Message = "تم دفع الرسوم بنجاح";
                    this.NotificationMessage(Message, "success");
      },
      error:(erro)=>{
       let Message = "عذرا حدث مشكلة اثناء عملية الدفع";
                    this.NotificationMessage(Message, "error");
      }
      
    })
  }

  //=================================================================================================
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

import { Component } from '@angular/core';
import { CertificateTemplatesService } from '../../../Services/certificate-templates.service';
import { Router, RouterLink } from '@angular/router';
import { CertificateTemplate } from '../../../Models/CertificateTemplate';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddAridCertificateComponent } from '../../AridCertificate/add-arid-certificate/add-arid-certificate.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-templates',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './certificate-templates.component.html',
  styleUrl: './certificate-templates.component.css'
})
export class CertificateTemplatesComponent {
page:number=1;
PageSize:number=10;
Total:number =0;
Search:string = "";
constructor(private certificateTemplatesService:CertificateTemplatesService,
  private Router:Router,private Dialog:MatDialog){
this.GetAll();
}

//====================================================================================
CertificateTemplates:CertificateTemplate[]=[];
GetAll(){
this.certificateTemplatesService.GetAll(this.page,this.PageSize,this.Search).subscribe({
  next:(value)=>{
    console.log(value.data)
    this.CertificateTemplates=value.data;
     this.page = value.currentPage;
    this.PageSize = value.pageSize;
    this.Total = value.totalPages;

  }
})
}

//====================================================================================
OnSerach(e:any){
  let word = e.target.value;
  this.Search = word;
  this.GetAll();


}
//====================================================================================
Delete(id:string){
this.certificateTemplatesService.Delete(id).subscribe({
  next:()=>{
    this.GetAll();

    this.Router.navigateByUrl("/userPage/CertificateTemplates");

  }
});
}
//====================================================================================
OpenAddDialog(templateId:string,language:number){
 const dialogRef = this.Dialog.open(AddAridCertificateComponent, {
       width: '560px',
       data: { TemplateId: templateId , Language:language}
     });
     dialogRef.afterClosed().subscribe((result: any) => {
             console.log(result)
 
     if (result == true) {
 
         let Message = "تم اضافة البيانات بنجاح";
         this.NotificationMessage(Message, "success");
         this.GetAll();
 
       }
       else if(result == false){
         let Message = "فشل اضافة البيانات حاول مرة اخري";
         this.NotificationMessage(Message, "error");
       }
 
     }
 
     );
}
  //=====================================================================================
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

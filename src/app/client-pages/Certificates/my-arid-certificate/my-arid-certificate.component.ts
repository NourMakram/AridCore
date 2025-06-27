import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Certificate } from '../../../Models/Certificate';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AddUserSkillsComponent } from '../../UserSkills/add-user-skills/add-user-skills.component';
import { EditAridCertificateComponent } from '../../../user-pages/AridCertificate/edit-arid-certificate/edit-arid-certificate.component';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditCertificateComponent } from '../edit-certificate/edit-certificate.component';
 @Component({
  selector: 'app-my-arid-certificate',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './my-arid-certificate.component.html',
  styleUrl: './my-arid-certificate.component.css'
})
export class MyAridCertificateComponent  implements OnInit{
userId:any;
  constructor(private certificateService:AridCertificateService,
    private tokenService:TokenServiceService,private dialog:MatDialog){

  }
  ngOnInit(): void {
   
    this.userId = this.tokenService.GetUserId();
    if(this.userId != undefined){
      this.GetUserCertificate(this.userId);
    }
  }

  //=======================================================================================
  downloadCertificate(id: number): void {
    this.certificateService.PdfExport(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${id}_شهادة.pdf`;  // اسم الشهادة
        link.click();
      },
      (error) => {
        console.error('Error downloading certificate', error);
      }
    );
  }
  //=======================================================================================
  Certificates :Certificate[]=[];
  GetUserCertificate(userId:string){
  this.certificateService.GetUserCertificate(userId).subscribe({
    next:(value)=>{
        this.Certificates = value;
    }
  })
  }

   //=============================================================================================
          OpenEditDialog(id:number,Language:string){
            const dialogRef = this.dialog.open(EditCertificateComponent, {
                  width: '560px',
                  data: {id:id ,Language:Language }
                });
                dialogRef.afterClosed().subscribe((result: any) => {
                  console.log(result)
            
                if (result == true) {
            
                    let Message = "تم اضافة البيانات بنجاح";
                    this.NotificationMessage(Message, "success");
                    this.GetUserCertificate(this.userId);
            
                  }
                  else if(result == false){
                    let Message = "فشل اضافة البيانات حاول مرة اخري";
                    this.NotificationMessage(Message, "error");
                  }
            
                }
            
                );
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

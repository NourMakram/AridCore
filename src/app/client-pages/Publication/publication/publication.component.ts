import { Component } from '@angular/core';
import { PublicationService } from '../../../Services/publication.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Publication } from '../../../Models/Publication';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private publicationService:PublicationService,private TokenService:TokenServiceService){
  this.userId = this.TokenService.GetUserId();
  if(this.userId!=null){
      this.GetToUser(this.userId);

  }
 }
  
  
  
 Publications: Publication[] = [];
    GetToUser(userId:string) {
      this.publicationService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.Publications = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.publicationService.Delete(id).subscribe({
        next: () => {
            let Message = "تم حذف البيانات بنجاح";
                this.NotificationMessage(Message, "success");
                this.GetToUser(this.userId);
         },
        error: (error) => {
            let Message = "فشل حذف البيانات حاول مرة اخري";
                this.NotificationMessage(Message, "error");
          console.log(error)
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

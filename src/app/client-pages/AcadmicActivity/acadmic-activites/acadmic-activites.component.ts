import { Component } from '@angular/core';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { TokenServiceService } from '../../../Services/token-service.service';
import { GenaricModel } from '../../../Models/GenaricModel';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acadmic-activites',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './acadmic-activites.component.html',
  styleUrl: './acadmic-activites.component.css'
})
export class AcadmicActivitesComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private acadmicActivityService:AcadmicActivityService,private TokenService:TokenServiceService){
  let userId = this.TokenService.GetUserId();
  if(userId!=null){
      this.GetToUser(userId);

  }
 }
  
  
  
AcadmicActivites: AcadmicActivity[] = [];
    GetToUser(userId:string) {
      this.acadmicActivityService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.AcadmicActivites = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.acadmicActivityService.Delete(id).subscribe({
        next: () => {
              let Message = "تم  حذف البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          this.GetToUser(this.userId);
        },
        error: (error) => {
           let Message = "حدث خطأ اثناء تحديث البيانات  حاول مرة اخري";
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

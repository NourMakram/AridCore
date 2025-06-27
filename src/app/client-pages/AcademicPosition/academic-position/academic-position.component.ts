import { Component } from '@angular/core';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { AcademicPositionService } from '../../../Services/academic-position.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-academic-position',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './academic-position.component.html',
  styleUrl: './academic-position.component.css'
})
export class AcademicPositionComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private academicPositionService:AcademicPositionService,private TokenService:TokenServiceService){
  let userId = this.TokenService.GetUserId();
  if(userId!=null){
      this.GetToUser(userId);

  }
 }
//=============================================================================================
  
AcadmicPositions: AcademicPosition[] = [];
    GetToUser(userId:string) {
      this.academicPositionService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.AcadmicPositions = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.academicPositionService.Delete(id).subscribe({
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

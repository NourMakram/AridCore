import { Component } from '@angular/core';
import { EducationalLevel } from '../../../Models/EducationalLevel';
import { EducationalLevelService } from '../../../Services/educational-level.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educational-levels',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './educational-levels.component.html',
  styleUrl: './educational-levels.component.css'
})
export class EducationalLevelsComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private EducationalLevelService:EducationalLevelService,private TokenService:TokenServiceService){
  let userId = this.TokenService.GetUserId();
  if(userId!=null){
      this.GetToUser(userId);

  }
 }
//=============================================================================================
  
EducationalLevels: EducationalLevel[] = [];
    GetToUser(userId:string) {
      this.EducationalLevelService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.EducationalLevels = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.EducationalLevelService.Delete(id).subscribe({
        next: () => {
          let Message = "تم  حذف البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");

          this.GetToUser(this.userId);
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء حذف البيانات  حاول مرة اخري";
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

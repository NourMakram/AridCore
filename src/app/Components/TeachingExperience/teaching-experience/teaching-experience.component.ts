import { Component } from '@angular/core';
import { TeachingExperience } from '../../../Models/TeachingExperience';
import { TeachingExperienceService } from '../../../Services/teaching-experience.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teaching-experience',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './teaching-experience.component.html',
  styleUrl: './teaching-experience.component.css'
})
export class TeachingExperienceComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private teachingExperienceService:TeachingExperienceService,
  private TokenService:TokenServiceService){
  let userId = this.TokenService.GetUserId();
  if(userId!=null){
      this.GetToUser(userId);

  }
 }
//=============================================================================================
TeachingExperiences: TeachingExperience[] = [];
    GetToUser(userId:string) {
      this.teachingExperienceService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.TeachingExperiences = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.teachingExperienceService.Delete(id).subscribe({
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

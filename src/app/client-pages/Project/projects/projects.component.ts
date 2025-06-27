import { Component } from '@angular/core';
import { ProjectService } from '../../../Services/project.service';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Project } from '../../../Models/Project';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private ProjectService:ProjectService,private TokenService:TokenServiceService){
  this.userId = this.TokenService.GetUserId();
  if(this.userId!=null){
      this.GetToUser(this.userId);

  }
 }
  
  
  
 Projects: Project[] = [];
    GetToUser(userId:string) {
      this.ProjectService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.Projects = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.ProjectService.Delete(id).subscribe({
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

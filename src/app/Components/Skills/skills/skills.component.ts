import { Component } from '@angular/core';
import { SkillsService } from '../../../Services/skills.service';
import { Skill } from '../../../Models/Skill';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
 page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
constructor(private skillService:SkillsService,public dialog:MatDialog){
  this.getAll();
}
  
  
  
Skills: Skill[] = [];
    getAll() {
      this.skillService.GetAll(this.page, this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.Skills = value.data;
          this.page = value.currentPage;
          this.pageSize = value.pageSize;
          this.Total = value.totalPages;
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.skillService.Delete(id).subscribe({
        next: () => {
          let Message = "تم  حذف البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          this.getAll();
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

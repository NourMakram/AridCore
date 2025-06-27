import { Component } from '@angular/core';
import { UserExpertise } from '../../../Models/UserExpertise';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserSkillService } from '../../../Services/user-skill.service';
import { UserExpertiseService } from '../../../Services/user-expertise.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserExpertiseComponent } from '../add-user-expertise/add-user-expertise.component';
import { EditUserExpertiseComponent } from '../edit-user-expertise/edit-user-expertise.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-expertises',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './user-expertises.component.html',
  styleUrl: './user-expertises.component.css'
})
export class UserExpertisesComponent {
page: number = 1;
     pageSize: number = 10;
     Total: number = 0;
     search: string = "";
     userId:any;
 constructor(private userExpertiseService:UserExpertiseService,private TokenService:TokenServiceService
  ,private dialog:MatDialog
 ){
   this.userId = this.TokenService.GetUserId();
   if(this.userId!=null){
       this.GetToUser(this.userId);
 
   }
  }

      //=============================================================================================
      OpenAddDialog(){
        const dialogRef = this.dialog.open(AddUserExpertiseComponent, {
              width: '560px',
              data: {  }
            });
            dialogRef.afterClosed().subscribe((result: any) => {
              console.log(result)
        
            if (result == true) {
        
                let Message = "تم اضافة البيانات بنجاح";
                this.NotificationMessage(Message, "success");
                this.GetToUser(this.userId);
        
              }
              else if(result == false){
                let Message = "فشل اضافة البيانات حاول مرة اخري";
                this.NotificationMessage(Message, "error");
              }
        
            }
        
            );
      }
      //=============================================================================================
  
     openEditDialog(id: number) {
         const dialogRef = this.dialog.open(EditUserExpertiseComponent, {
           width: '560px',
           data: { id: id }
         });
         dialogRef.afterClosed().subscribe((result:any) => {
           console.log(result)
           if (result == true) {
     
             let Message = "تم تعديل البيانات بنجاح";
             this.NotificationMessage(Message, "success");
             this.GetToUser(this.userId);
     
           }
           else if(result == false){
             let Message = "فشل تعديل البيانات حاول مرة اخري";
             this.NotificationMessage(Message, "error");
           }
     
         }
     
         );
       }
  //=================================================================================================
  UserExpertises: UserExpertise[] = [];
     GetToUser(userId:string) {
       this.userExpertiseService.GetToUser(userId).subscribe({
         next: (value) => {
           // console.log(value);
           this.UserExpertises = value;
         },
         error: (error) => {
           console.log(error)
         }
       })
     }
    
     //=============================================================================================
     Delete(id: number) {
       this.userExpertiseService.Delete(id).subscribe({
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


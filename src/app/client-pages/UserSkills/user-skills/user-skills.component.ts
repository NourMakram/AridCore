import { Component } from '@angular/core';
import { UserSkillService } from '../../../Services/user-skill.service';
import { UserSKill } from '../../../Models/UserSKill';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AddUserSkillsComponent } from '../add-user-skills/add-user-skills.component';
import { MatDialog } from '@angular/material/dialog';
import { EditUserSkillsComponent } from '../edit-user-skills/edit-user-skills.component';

@Component({
  selector: 'app-user-skills',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './user-skills.component.html',
  styleUrl: './user-skills.component.css'
})
export class UserSkillsComponent {
     page: number = 1;
     pageSize: number = 10;
     Total: number = 0;
     search: string = "";
     userId:any;
 constructor(private userSkillsService:UserSkillService,private TokenService:TokenServiceService
  ,public dialog:MatDialog
 ){
   this.userId = this.TokenService.GetUserId();
   if(this.userId!=null){
       this.GetToUser(this.userId);
 
   }
  }
  //=================================================================================================
  UserSKills: UserSKill[] = [];
     GetToUser(userId:string) {
       this.userSkillsService.GetToUser(userId).subscribe({
         next: (value) => {
           // console.log(value);
           this.UserSKills = value;
         },
         error: (error) => {
           console.log(error)
         }
       })
     }
    
     //=============================================================================================
     Delete(id: number) {
       this.userSkillsService.Delete(id).subscribe({
         next:() => {
            let Message = "تم  حذف البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
          if(this.userId!= undefined){

            this.GetToUser(this.userId);
      
        }
         },
         error: (error) => {
           let Message = "حدث خطأ اثناء حذف البيانات  حاول مرة اخري";
          this.NotificationMessage(Message, "error");

           console.log(error)
         }
       })
     }
    //=============================================================================================
        OpenAddDialog(){
          const dialogRef = this.dialog.open(AddUserSkillsComponent, {
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
           const dialogRef = this.dialog.open(EditUserSkillsComponent, {
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
 
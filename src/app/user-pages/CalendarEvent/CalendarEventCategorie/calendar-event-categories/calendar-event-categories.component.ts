import { Component, OnInit } from '@angular/core';
import { CalendarEventCategorieService } from '../../../../Services/calendar-event-categorie.service';
import { CalendarEventCategorie } from '../../../../Models/CalendarEvent';
import { AddCalendarEventCategorieComponent } from '../add-calendar-event-categorie/add-calendar-event-categorie.component';
import { EditCalendarEventCategorieComponent } from '../edit-calendar-event-categorie/edit-calendar-event-categorie.component';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendar-event-categories',
  standalone: true,
  imports: [CommonModule,RouterLink,MatDialogModule],
  templateUrl: './calendar-event-categories.component.html',
  styleUrl: './calendar-event-categories.component.css'
})
export class CalendarEventCategoriesComponent  implements OnInit{
CalendarEventCategories:CalendarEventCategorie[]=[];
/**
 *
 */
constructor(private calendarEventCategorieService:CalendarEventCategorieService,private dialog:MatDialog) {
   
}
  ngOnInit(): void {
    this.GetAll();
  }
  //===================================================================================
  GetAll(){
    this.calendarEventCategorieService.GetAll().subscribe({
      next:(value)=>{
        this.CalendarEventCategories = value;
      }
    })
  }
  //===================================================================================
 Delete(id: number) {
     this.calendarEventCategorieService.Delete(id).subscribe({
       next: () => {
         let Message = "تم حذف البيانات بنجاح";
         this.NotificationMessage(Message, "success");
  
        this.GetAll();
       
       },
       error: (error) => {
         let Message = "فشل حذف البيانات حاول مرة اخري";
         this.NotificationMessage(Message, "error");
         console.log(error);
       }
     })
   }
   //================================================================================================
   openAddDialog() {
     const dialogRef = this.dialog.open(AddCalendarEventCategorieComponent, {
       width: '560px',
       data: { }
     });
     dialogRef.afterClosed().subscribe((result: any) => {
             console.log(result)
 
     if (result == true) {
 
         let Message = "تم اضافة البيانات بنجاح";
         this.NotificationMessage(Message, "success");
         this.GetAll();
 
       }
       else if(result == false){
         let Message = "فشل اضافة البيانات حاول مرة اخري";
         this.NotificationMessage(Message, "error");
       }
 
     }
 
     );
   }
 
 
 
   //================================================================================================
   openEditDialog(id: number) {
     const dialogRef = this.dialog.open(EditCalendarEventCategorieComponent, {
       width: '560px',
       data: { id: id }
     });
     dialogRef.afterClosed().subscribe((result:any) => {
       console.log(result)
       if (result == true) {
 
         let Message = "تم تعديل البيانات بنجاح";
         this.NotificationMessage(Message, "success");
         this.GetAll();
 
       }
       else if(result == false){
         let Message = "فشل تعديل البيانات حاول مرة اخري";
         this.NotificationMessage(Message, "error");
       }
 
     }
 
     );
   }
   //=====================================================================================
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

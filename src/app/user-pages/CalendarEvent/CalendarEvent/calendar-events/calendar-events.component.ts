import { Component } from '@angular/core';
import { CalendarEventService } from '../../../../Services/calendar-event.service';
import { CalendarEvent } from '../../../../Models/CalendarEvent';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddCalendarEventCategorieComponent } from '../../CalendarEventCategorie/add-calendar-event-categorie/add-calendar-event-categorie.component';
import { EditCalendarEventCategorieComponent } from '../../CalendarEventCategorie/edit-calendar-event-categorie/edit-calendar-event-categorie.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EditCalendarEventComponent } from '../edit-calendar-event/edit-calendar-event.component';
import { AddCalendarEventComponent } from '../add-calendar-event/add-calendar-event.component';
import { DetailsCalendarEventComponent } from '../details-calendar-event/details-calendar-event.component';

@Component({
  selector: 'app-calendar-events',
  standalone: true,
  imports: [CommonModule,RouterLink,MatDialogModule],
  templateUrl: './calendar-events.component.html',
  styleUrl: './calendar-events.component.css'
})
export class CalendarEventsComponent {
CalendarEvents:CalendarEvent[]=[];
/**
 *
 */
constructor(private calendarEventService:CalendarEventService,private dialog:MatDialog) {
   
}
  ngOnInit(): void {
    this.GetAll();
  }
  //===================================================================================
  GetAll(){
    this.calendarEventService.GetAll().subscribe({
      next:(value)=>{
        this.CalendarEvents = value;
      }
    })
  }
  //===================================================================================
 Delete(id: number) {
     this.calendarEventService.Delete(id).subscribe({
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
     const dialogRef = this.dialog.open(AddCalendarEventComponent, {
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
     const dialogRef = this.dialog.open(EditCalendarEventComponent, {
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
   //================================================================================================
   openDetailsDialog(id: number) {
     const dialogRef = this.dialog.open(DetailsCalendarEventComponent, {
       width: '560px',
       data: { id: id }
     });
     
     dialogRef.afterClosed().subscribe((result:any) => {
    
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

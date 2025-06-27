import { Component, Inject } from '@angular/core';
import { CalendarEvent } from '../../../../Models/CalendarEvent';
import { CalendarEventService } from '../../../../Services/calendar-event.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-calendar-event',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './details-calendar-event.component.html',
  styleUrl: './details-calendar-event.component.css'
})
export class DetailsCalendarEventComponent {
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private calendarEventService: CalendarEventService
  ,public dialogRef: MatDialogRef<DetailsCalendarEventComponent>,@Inject(MAT_DIALOG_DATA) public Data: { id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
  }

  
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
//===================================================================
CalendarEvent:CalendarEvent= {} as CalendarEvent;
  Get(id: number) {
    this.calendarEventService.Details(id).subscribe({
      next: (value:CalendarEvent)=>{
        this.CalendarEvent = value ;
      }
    })
  }
}

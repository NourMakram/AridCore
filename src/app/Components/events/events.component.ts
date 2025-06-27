import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarEventService } from '../../Services/calendar-event.service';
import { CalendarEvent, Event } from '../../Models/CalendarEvent';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,FullCalendarModule ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  Events:Event[]=[];

  constructor(private calendarEventService:CalendarEventService){

  }
  ngOnInit(): void {
    this.GetEvents();
  }
calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: this.Events
    // [
    //   //{ title: 'Meeting', start: new Date(),color:"yellow",end:'' }
    // ]
  };

  //=====================================================================================================
CalendarEvents:CalendarEvent[]=[];
  GetEvents(){
  this.calendarEventService.GetAll().subscribe({
    next: (value) => {
      this.CalendarEvents = value;
      this.Events = this.CalendarEvents.map(element => ({
        title: element.name,
        start:this.convertToISO(element.startingDate),
        end: this.convertToISO(element.endingDate),
        color: element.calenderEventCategoryColor
      }));
      
      // ✅ تحديث الأحداث داخل خيارات التقويم
      this.calendarOptions.events = [...this.Events];
    }
  });
      }
//=======================================================================================================
convertToISO(dateStr: string): string {
  if (!dateStr) return ''; // تأكد أن التاريخ موجود

   const parts = dateStr.trim().split(' ');
  if (parts.length < 3) return ''; 

  const [day, month, year] = parts[0].split('/');
  const time = parts[2];
  let [hour, minute] = time?.split(':') || ['00', '00'];

  if (parts[1] === 'م') {
    hour = (parseInt(hour) < 12 ? parseInt(hour) + 12 : parseInt(hour)).toString();
  } else if (parts[1] === 'ص' && parseInt(hour) === 12) {
    hour = '00';  
  }

  hour = hour.padStart(2, '0');
  minute = minute.padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minute}:00`;
}
  

  
}

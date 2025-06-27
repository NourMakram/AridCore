import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEventCategorie } from '../../../../Models/CalendarEvent';
import { CalendarEventCategorieService } from '../../../../Services/calendar-event-categorie.service';
import { CalendarEventService } from '../../../../Services/calendar-event.service';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { AddCalendarEventComponent } from '../add-calendar-event/add-calendar-event.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-calendar-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-calendar-event.component.html',
  styleUrl: './edit-calendar-event.component.css'
})
export class EditCalendarEventComponent {
  CalendarEventForm: FormGroup;
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private calendarEventCategorieService: CalendarEventCategorieService, private calendarEventService: CalendarEventService
    , public dialogRef: MatDialogRef<AddCalendarEventComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.CalendarEventForm = fb.group({
      id: [this.Data.id, Validators.required],
      name: ['', [Validators.required]],
      url: ['', Validators.required],
      startingDate: ['', Validators.required],
      endingDate: ['', Validators.required],
      description: ['', Validators.required],
      calendarEventCategoryId: ['', Validators.required],
    });
    this.GetCategories();

    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
  }

  //====================================================================================================
  Submit() {
    if (this.CalendarEventForm.valid) {
      this.calendarEventService.Edit(this.CalendarEventForm?.value)
        .subscribe({
          next: (value) => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.dialogRef.close(false);
          }
        })
    }
    else {
      Object.keys(this.CalendarEventForm.controls).forEach(field => {
        const control = this.CalendarEventForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }


  //================================================================================================
  CalendarEventCategories: CalendarEventCategorie[] = [];
  GetCategories() {
    this.calendarEventCategorieService.GetAll().subscribe({
      next: (value) => {
        this.CalendarEventCategories = value;
      }
    })
  }

  Get(id: number) {
    this.calendarEventService.Get(id).subscribe({
      next: (value)=>{
        this.CalendarEventForm.patchValue({
          id: value.id,
          name: value.name,
          url: value.url,
          startingDate: value.startingDate,
          endingDate: value.endingDate,
          description: value.description,
          calendarEventCategoryId: value.calendarEventCategoryId,

        });
      }
    })
  }
}


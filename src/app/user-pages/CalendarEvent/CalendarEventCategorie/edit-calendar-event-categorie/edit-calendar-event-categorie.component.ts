import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEventCategorieService } from '../../../../Services/calendar-event-categorie.service';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-calendar-event-categorie',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-calendar-event-categorie.component.html',
  styleUrl: './edit-calendar-event-categorie.component.css'
})
export class EditCalendarEventCategorieComponent {
  CalendarEventCategorieForm: FormGroup;
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private calendarEventCategorieService: CalendarEventCategorieService
    , public dialogRef: MatDialogRef<EditCalendarEventCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.CalendarEventCategorieForm = fb.group({
      id: [this.Data.id, Validators.required],
      name: ['', [Validators.required]],
      color: ['', Validators.required],


    });
    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
  }

  //====================================================================================================
  Submit() {
    if (this.CalendarEventCategorieForm.valid) {
      this.calendarEventCategorieService.Edit(this.CalendarEventCategorieForm?.value)
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
      Object.keys(this.CalendarEventCategorieForm.controls).forEach(field => {
        const control = this.CalendarEventCategorieForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }


  //================================================================================================
  Get(id: number) {
    this.calendarEventCategorieService.Get(id).subscribe({
      next: (value) => {
        this.CalendarEventCategorieForm.patchValue({
          id: value.id,
          name: value.name,
          color: value.color
        })
      }
    })
  }
}


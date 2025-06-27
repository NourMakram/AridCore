import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarEventCategorieService } from '../../../../Services/calendar-event-categorie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../../Services/token-service.service';

@Component({
  selector: 'app-add-calendar-event-categorie',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, CommonModule, RouterLink, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './add-calendar-event-categorie.component.html',
  styleUrl: './add-calendar-event-categorie.component.css'
})
export class AddCalendarEventCategorieComponent {
CalendarEventCategorieForm:FormGroup;
userId:any;
RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
,private calendarEventCategorieService:CalendarEventCategorieService
,public dialogRef: MatDialogRef<AddCalendarEventCategorieComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.CalendarEventCategorieForm = fb.group({
     name :['',[Validators.required]],
     color :['',Validators.required],

     
  });
}

//====================================================================================================
 Submit() {
    if (this.CalendarEventCategorieForm.valid) {
       this.calendarEventCategorieService.Create(this.CalendarEventCategorieForm?.value)
      .subscribe({
        next:(value)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
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
  
}

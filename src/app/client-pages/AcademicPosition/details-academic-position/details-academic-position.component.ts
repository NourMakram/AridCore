import { Component, Inject } from '@angular/core';
import { AcademicPositionService } from '../../../Services/academic-position.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from '../../../Models/CalendarEvent';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-academic-position',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './details-academic-position.component.html',
  styleUrl: './details-academic-position.component.css'
})
export class DetailsAcademicPositionComponent {
userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private academicPositionService: AcademicPositionService
  ,public dialogRef: MatDialogRef<DetailsAcademicPositionComponent>,@Inject(MAT_DIALOG_DATA) public Data: { id: number }

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
AcademicPosition:AcademicPosition= {} as AcademicPosition;
  Get(id: number) {
    this.academicPositionService.Details(id).subscribe({
      next: (value:AcademicPosition)=>{
        this.AcademicPosition = value ;
      }
    })
  }
}


import { Component, Inject } from '@angular/core';
import { EducationalLevelService } from '../../../Services/educational-level.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { TokenServiceService } from '../../../Services/token-service.service';
import { EducationalLevel } from '../../../Models/EducationalLevel';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-educational-level',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './details-educational-level.component.html',
  styleUrl: './details-educational-level.component.css'
})
export class DetailsEducationalLevelComponent {
userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private educationalLevelService: EducationalLevelService
  ,public dialogRef: MatDialogRef<DetailsEducationalLevelComponent>,@Inject(MAT_DIALOG_DATA) public Data: { id: number }

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
EducationalLevel:EducationalLevel= {} as EducationalLevel;
  Get(id: number) {
    this.educationalLevelService.Details(id).subscribe({
      next: (value:EducationalLevel)=>{
        this.EducationalLevel = value ;
      }
    })
  }



}

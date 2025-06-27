import { Component, Inject } from '@angular/core';
import { TeachingExperience } from '../../../Models/TeachingExperience';
import { TeachingExperienceService } from '../../../Services/teaching-experience.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { DetailsEducationalLevelComponent } from '../../EducationalLevel/details-educational-level/details-educational-level.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-teaching-experience',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './details-teaching-experience.component.html',
  styleUrl: './details-teaching-experience.component.css'
})
export class DetailsTeachingExperienceComponent {
userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private teachingExperienceService: TeachingExperienceService
  ,public dialogRef: MatDialogRef<DetailsTeachingExperienceComponent>,
  @Inject(MAT_DIALOG_DATA) public Data: { id: number }

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
TeachingExperience:TeachingExperience= {} as TeachingExperience;
  Get(id: number) {
    this.teachingExperienceService.Details(id).subscribe({
      next: (value:TeachingExperience)=>{
        console.log(value);
        this.TeachingExperience = value ;
      }
    })
  }

}

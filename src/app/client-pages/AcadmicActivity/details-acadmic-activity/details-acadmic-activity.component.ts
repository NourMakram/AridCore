import { Component, Inject } from '@angular/core';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-acadmic-activity',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './details-acadmic-activity.component.html',
  styleUrl: './details-acadmic-activity.component.css'
})
export class DetailsAcadmicActivityComponent {
userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private acadmicActivityService: AcadmicActivityService
  ,public dialogRef: MatDialogRef<DetailsAcadmicActivityComponent>,@Inject(MAT_DIALOG_DATA) public Data: { id: number }

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
AcadmicActivity:AcadmicActivity= {} as AcadmicActivity;
  Get(id: number) {
    this.acadmicActivityService.Details(id).subscribe({
      next: (value:AcadmicActivity)=>{
        this.AcadmicActivity = value ;
      }
    })
  }
}


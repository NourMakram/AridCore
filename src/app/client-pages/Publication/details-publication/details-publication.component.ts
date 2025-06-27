import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationService } from '../../../Services/publication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeachingExperience } from '../../../Models/TeachingExperience';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Publication } from '../../../Models/Publication';

@Component({
  selector: 'app-details-publication',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './details-publication.component.html',
  styleUrl: './details-publication.component.css'
})
export class DetailsPublicationComponent {
userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService,private publicationService: PublicationService
  ,public dialogRef: MatDialogRef<DetailsPublicationComponent>,@Inject(MAT_DIALOG_DATA) public Data: { id: number }

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
Publication:Publication= {} as Publication;
  Get(id: number) {
    this.publicationService.Details(id).subscribe({
      next: (value:Publication)=>{
        this.Publication = value ;
      }
    })
  }

}

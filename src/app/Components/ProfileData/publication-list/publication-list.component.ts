import { Component } from '@angular/core';
import { PublicationService } from '../../../Services/publication.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { Publication } from '../../../Models/Publication';
import { CommonModule } from '@angular/common';
import { DetailsPublicationComponent } from '../../../client-pages/Publication/details-publication/details-publication.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.css'
})
export class PublicationListComponent {
 Id:any;
constructor(private publicationService:PublicationService,
  private activeRouter:ActivatedRoute,private dialog:MatDialog){
   
}
  ngOnInit(): void {
     this.activeRouter.parent!.paramMap
  .subscribe(params => {
    this.Id = params.get('id')!;
    if(this.Id!=undefined){
          this.GetAcadmicPositions(this.Id)

    }
   });
  }

  //=======================================================================================================
   Publications: Publication[] = [];
        GetAcadmicPositions(userId:string) {
          this.publicationService.GetToUser(userId).subscribe({
            next: (value) => {
              // console.log(value);
              this.Publications = value.data;
            },
            error: (error) => {
              console.log(error)
            }
          })
  }
  //=======================================================================================================
//================================================================================================
   openDetailsDialog(id: number) {
     const dialogRef = this.dialog.open(DetailsPublicationComponent, {
       width: '560px',
       data: { id: id }
     });
     
     dialogRef.afterClosed().subscribe((result:any) => {
    
     }
 
     );
   }
}

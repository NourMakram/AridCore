import { Component } from '@angular/core';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { AcadmicActivity } from '../../../Models/AcadmicActivity';
import { CommonModule } from '@angular/common';
import { DetailsAcadmicActivityComponent } from '../../../client-pages/AcadmicActivity/details-acadmic-activity/details-acadmic-activity.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-acadamic-activity-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './acadamic-activity-list.component.html',
  styleUrl: './acadamic-activity-list.component.css'
})
export class AcadamicActivityListComponent {
 Id:any;
constructor(private acadmicActivityService:AcadmicActivityService,
  private dialog:MatDialog,
  private activeRouter:ActivatedRoute){
   
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
   AcadmicActivitys: AcadmicActivity[] = [];
        GetAcadmicPositions(userId:string) {
          this.acadmicActivityService.GetToUser(userId).subscribe({
            next: (value) => {
              // console.log(value);
              this.AcadmicActivitys = value.data;
            },
            error: (error) => {
              console.log(error)
            }
          })
  }
  //=======================================================================================================
//================================================================================================
   openDetailsDialog(id: number) {
     const dialogRef = this.dialog.open(DetailsAcadmicActivityComponent, {
       width: '560px',
       data: { id: id }
     });
     
     dialogRef.afterClosed().subscribe((result:any) => {
    
     }
 
     );
   }
}

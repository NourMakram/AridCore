import { Component, OnInit } from '@angular/core';
import { AcademicPositionService } from '../../../Services/academic-position.service';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsAcademicPositionComponent } from '../../../client-pages/AcademicPosition/details-academic-position/details-academic-position.component';

@Component({
  selector: 'app-acadamic-position-list',
  standalone: true,
  imports: [CommonModule,RouterLink,MatDialogModule],
  templateUrl: './acadamic-position-list.component.html',
  styleUrl: './acadamic-position-list.component.css'
})
export class AcadamicPositionListComponent  implements OnInit{
  Id:any;
constructor(private academicPositionService:AcademicPositionService,
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
   AcadmicPositions: AcademicPosition[] = [];
        GetAcadmicPositions(userId:string) {
          this.academicPositionService.GetToUser(userId).subscribe({
            next: (value) => {
              // console.log(value);
              this.AcadmicPositions = value.data;
            },
            error: (error) => {
              console.log(error)
            }
          })
  }
  //=======================================================================================================
//================================================================================================
   openDetailsDialog(id: number) {
     const dialogRef = this.dialog.open(DetailsAcademicPositionComponent, {
       width: '560px',
       data: { id: id }
     });
     
     dialogRef.afterClosed().subscribe((result:any) => {
    
     }
 
     );
   }


}


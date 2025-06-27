import { Component } from '@angular/core';
import { EducationalLevelService } from '../../../Services/educational-level.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { EducationalLevel } from '../../../Models/EducationalLevel';
import { CommonModule } from '@angular/common';
import { DetailsEducationalLevelComponent } from '../../../client-pages/EducationalLevel/details-educational-level/details-educational-level.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-education-level-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './education-level-list.component.html',
  styleUrl: './education-level-list.component.css'
})
export class EducationLevelListComponent {
 Id:any;
constructor(private educationalLevelService:EducationalLevelService
  ,private activeRouter:ActivatedRoute,private dialog:MatDialog){
   
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
   EducationalLevels: EducationalLevel[] = [];
        GetAcadmicPositions(userId:string) {
          this.educationalLevelService.GetToUser(userId).subscribe({
            next: (value) => {
              // console.log(value);
              this.EducationalLevels = value.data;
            },
            error: (error) => {
              console.log(error)
            }
          })
  }
  //=======================================================================================================
//================================================================================================
   openDetailsDialog(id: number) {
     const dialogRef = this.dialog.open(DetailsEducationalLevelComponent, {
       width: '560px',
       data: { id: id }
     });
     
     dialogRef.afterClosed().subscribe((result:any) => {
    
     }
 
     );
   }


}

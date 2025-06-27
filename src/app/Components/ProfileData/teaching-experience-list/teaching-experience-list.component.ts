import { Component, OnInit } from '@angular/core';
import { TeachingExperienceService } from '../../../Services/teaching-experience.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AcademicPosition } from '../../../Models/AcademicPosition';
import { TeachingExperience } from '../../../Models/TeachingExperience';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetailsTeachingExperienceComponent } from '../../../client-pages/TeachingExperience/details-teaching-experience/details-teaching-experience.component';

@Component({
  selector: 'app-teaching-experience-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './teaching-experience-list.component.html',
  styleUrl: './teaching-experience-list.component.css'
})
export class TeachingExperienceListComponent implements OnInit{
  Id:any;
constructor(private academicPositionService:TeachingExperienceService,
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
   TeachingExperiences: TeachingExperience[] = [];
        GetAcadmicPositions(userId:string) {
          this.academicPositionService.GetToUser(userId).subscribe({
            next: (value) => {
              // console.log(value);
              this.TeachingExperiences = value.data;
            },
            error: (error) => {
              console.log(error)
            }
          })
  }
  //================================================================================================
     openDetailsDialog(id: number) {
       const dialogRef = this.dialog.open(DetailsTeachingExperienceComponent, {
         width: '560px',
         data: { id: id }
       });
       
       dialogRef.afterClosed().subscribe((result:any) => {
      
       }
   
       );
     }


}

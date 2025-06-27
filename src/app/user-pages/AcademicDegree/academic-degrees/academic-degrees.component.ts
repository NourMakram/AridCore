import { Component } from '@angular/core';
import { AcadmicActivityService } from '../../../Services/acadmic-activity.service';
import { AcademicDegreeService } from '../../../Services/academic-degree.service';
import { AcademicDegree } from '../../../Models/AcademicDegree';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic-degrees',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './academic-degrees.component.html',
  styleUrl: './academic-degrees.component.css'
})
export class AcademicDegreesComponent {
  page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
constructor(private AcademicDegreesService:AcademicDegreeService){
  this.getAll();
}
  
  
  
AcademicDegrees: AcademicDegree[] = [];
    getAll() {
      this.AcademicDegreesService.GetAll(this.page, this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.AcademicDegrees = value.data;
          this.page = value.currentPage;
          this.pageSize = value.pageSize;
          this.Total = value.totalPages;
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.AcademicDegreesService.Delete(id).subscribe({
        next: () => {
          this.getAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }


}

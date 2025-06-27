import { Component } from '@angular/core';
import { ExpertiseService } from '../../../Services/expertise.service';
import { Expertise } from '../../../Models/Expertise';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expertises',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './expertises.component.html',
  styleUrl: './expertises.component.css'
})
export class ExpertisesComponent {
 page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
constructor(private expertiseService:ExpertiseService){
  this.getAll();
}
  
  
  
Expertises: Expertise[] = [];
    getAll() {
      this.expertiseService.GetAll(this.page, this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.Expertises = value.data;
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
      this.expertiseService.Delete(id).subscribe({
        next: () => {
          this.getAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}

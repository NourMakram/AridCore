import { Component } from '@angular/core';
import { FacultyService } from '../../../Services/faculty.service';
import { Router, RouterLink } from '@angular/router';
import { Faculty } from '../../../Models/Faculty';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-faculties',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css'
})
export class FacultiesComponent {
page: number = 1;
  pageSize: number = 10;
  Total: number = 0;
  search: string = "";
  constructor(private facultyService: FacultyService, private Router: Router) {
    this.getAll();
   }



  faculitites: Faculty[] = [];
  getAll() {
    this.facultyService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
        // console.log(value);
        this.faculitites = value.data;
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
    this.facultyService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

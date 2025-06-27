import { Component } from '@angular/core';
import { UniversityService } from '../../../Services/university.service';
import { University } from '../../../Models/University';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-universities',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './universities.component.html',
  styleUrl: './universities.component.css'
})
export class UniversitiesComponent {
  page: number = 1;
  pageSize: number = 10;
  Total: number = 0;
  search: string = "";
  constructor(private universityService: UniversityService, private Router: Router) {
    this.getAll();
  }



  Universities: University[] = [];
  getAll() {
    this.universityService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
        // console.log(value);
        this.Universities = value.data;
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
    this.universityService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

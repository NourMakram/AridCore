import { Component } from '@angular/core';
import { SpecialityService } from '../../../Services/speciality.service';
import { Router, RouterLink } from '@angular/router';
import { speciality } from '../../../Models/speciality';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialities',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './specialities.component.html',
  styleUrl: './specialities.component.css'
})
export class SpecialitiesComponent {
  page: number = 1;
  pageSize: number = 10;
  Total: number = 0;
  search: string = "";
  constructor(private SpecialityService: SpecialityService, private Router: Router) {
    this.getAll();
   }



  Specialites: speciality[] = [];
  getAll() {
    this.SpecialityService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
        // console.log(value);
        this.Specialites = value.data;
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
    this.SpecialityService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
import { Component } from '@angular/core';
import { CityService } from '../../../Services/city.service';
import { Router, RouterLink } from '@angular/router';
import { City } from '../../../Models/City';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cities',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
  page: number = 1;
  pageSize: number = 10;
  Total: number = 0;
  search: string = "";
  constructor(private CityService: CityService, private Router: Router) {
    this.getAll();
   }



  Cities: City[] = [];
  getAll() {
    this.CityService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
        // console.log(value);
        this.Cities = value.data;
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
    this.CityService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

import { Component } from '@angular/core';
import { CountryService } from '../../../Services/country.service';
import { Country } from '../../../Models/Country';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent {
  page: number = 1;
  pageSize: number = 10;
  Total: number = 0;
  search: string = "";
  constructor(private CountryService: CountryService, private Router: Router) {
    this.getAll();
    this.GetCountries();
  }
  


  Countries: Country[] = [];
  getAll() {
    this.CountryService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
       // console.log(value);
        this.Countries = value.data;
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
  countoresss: Country[] = [];
  GetCountries() {
    this.CountryService.GetCountries().subscribe({
      next: (value) => {
        this.countoresss = value;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  //=============================================================================================
  Delete(id: number) {
    this.CountryService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
    }
  
}

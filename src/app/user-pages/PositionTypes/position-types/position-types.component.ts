import { Component } from '@angular/core';
import { PositionTypeService } from '../../../Services/position-type.service';
import { PositionType } from '../../../Models/PositionType';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-position-types',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './position-types.component.html',
  styleUrl: './position-types.component.css'
})
export class PositionTypesComponent {

 page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
constructor(private PositionTypesService:PositionTypeService){
  this.getAll();
}
  
  
  
PositionTypes: PositionType[] = [];
    getAll() {
      this.PositionTypesService.GetAll(this.page, this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.PositionTypes = value.data;
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
      this.PositionTypesService.Delete(id).subscribe({
        next: () => {
          this.getAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }


}

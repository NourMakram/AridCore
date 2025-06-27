import { Component, OnInit } from '@angular/core';
import { DonateServiceService } from '../../../Services/donate-service.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Donate } from '../../../Models/Donate';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donates',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './donates.component.html',
  styleUrl: './donates.component.css'
})
export class DonatesComponent implements OnInit {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private donateServiceService:DonateServiceService){

}
 //=============================================================================================
  ngOnInit(): void {
    this.GetAll();
  }
//=============================================================================================
  
Donates: Donate[] = [];
    GetAll() {
      this.donateServiceService.GetAll(this.page,this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.Donates = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.donateServiceService.Delete(id).subscribe({
        next: () => {
          this.GetAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}

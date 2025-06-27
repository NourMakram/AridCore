import { Component } from '@angular/core';
import { DonateServiceService } from '../../../Services/donate-service.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Donate } from '../../../Models/Donate';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private donateServiceService:DonateServiceService,private tokenServiceService:TokenServiceService){
  this.userId = this.tokenServiceService.GetUserId();
if(this.userId != null){
  this.GetAll(this.userId);

}
 }
//=============================================================================================
  
Donates: Donate[] = [];
    GetAll(userId:string) {
      this.donateServiceService.GetByUserId(this.userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.Donates = value;
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
          this.GetAll(this.userId);
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}

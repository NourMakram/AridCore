import { Component } from '@angular/core';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { CreditSystem } from '../../../../Models/CreditSystem';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-credit-system',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './show-credit-system.component.html',
  styleUrl: './show-credit-system.component.css'
})
export class ShowCreditSystemComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private creditSystemService:CreditSystemService){
  
  this.GetAll();
 }
//=============================================================================================
  
CreditSystems: CreditSystem[] = [];
    GetAll() {
      this.creditSystemService.GetAll(this.page,this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.CreditSystems = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.creditSystemService.Delete(id).subscribe({
        next: () => {
          this.GetAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}

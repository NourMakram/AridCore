import { Component } from '@angular/core';
import { PartnerService } from '../../../Services/partner.service';
import { Partner } from '../../../Models/Partner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partners',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private partnerService:PartnerService){

}
 //=============================================================================================
  ngOnInit(): void {
    this.GetAll();
  }
//=============================================================================================
  
Partners: Partner[] = [];
    GetAll() {
      this.partnerService.GetAll(this.page,this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.Partners = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.partnerService.Delete(id).subscribe({
        next: () => {
          this.GetAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}

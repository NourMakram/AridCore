import { Component } from '@angular/core';
import { Partner } from '../../../Models/Partner';
import { PartnerService } from '../../../Services/partner.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-partners',
  standalone:true,
  imports:[CommonModule,RouterLink,MatPaginatorModule],
  templateUrl: './list-partners.component.html',
  styleUrl: './list-partners.component.css'
})
export class ListPartnersComponent {
    page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
    total:number=0;
    PageCounts:number = 0;
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
           this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
//=============================================================================================

   onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;
 
      this.GetAll();
    }
  }
}

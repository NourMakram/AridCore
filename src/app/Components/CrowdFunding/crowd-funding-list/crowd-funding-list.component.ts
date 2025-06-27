import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CrowdFunding } from '../../../Models/CrowdFunding';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';

@Component({
  selector: 'app-crowd-funding-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './crowd-funding-list.component.html',
  styleUrl: './crowd-funding-list.component.css'
})
export class CrowdFundingListComponent implements OnInit{
CrowdFundingList:CrowdFunding[]=[];
page:number=1;
pageSize:number=40;
hasPrev:boolean = false;
hasnext:boolean = false;
PageCounts:number = 0;
constructor(private CrowdFundingService:CrowdFundingService) {
   
  
}

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.CrowdFundingService.GetAllUsers(this.page,this.pageSize,"",this.Stuats).subscribe({
      next:(value)=>{
        this.CrowdFundingList = value.data;
        this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext=value.hasNextPage ;
      }
    })
  }
  //============================================================================
  GetPrev(){
    if(this.hasPrev&& this.page > 1){
      this.page -= 1 ;
      this.GetAll();
    }
  }

  //===============================================================================
  GetNext(){
    if(this.hasnext){
      this.page += 1 ;
      this.GetAll();
    }
  }
  //==============================================================================
  GetByPage(page:number){
    if(this.PageCounts >= page){
     this.page = page ;
    this.GetAll();



    }
  }
  //========================================================================
  get GetPagesArray(){
    let pages =new Array();
    for (let i: number = 1;i <= this.PageCounts;i++) {
      pages.push(i);
    }
    return pages;
  }
//========================================================================
  Stuats: number = 0;
  FilterByProjectStuats(e: any) {
    this.Stuats = e.target.value;
    console.log(this.Stuats);

    this.GetAll();
  }
}

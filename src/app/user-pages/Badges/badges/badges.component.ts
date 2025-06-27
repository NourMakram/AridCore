import { Component } from '@angular/core';
import { Badge } from '../../../Models/Badge';
import { Router, RouterLink } from '@angular/router';
import { BadgesService } from '../../../Services/badges.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-badges',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule,MatPaginatorModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent {
Badges:Badge[]=[];
page:number=1;
pageSize:number=30;
PageCounts: number = 0;
  total: number = 0;
constructor(private BadgeService:BadgesService,private Router:Router){

  this.GetAll();
}
//================================================================================
GetAll(){
  this.BadgeService.GetAll(this.page,this.pageSize).subscribe({
    next:(value)=>{
      this.Badges = value.data;
      this.page = value.currentPage;
      this.pageSize = value.pageSize;
       this.PageCounts = value.totalPages;
        this.total = value.totalCount;
    }
  });
  

}
//================================================================================
Delete(id:number){
this.BadgeService.Delete(id).subscribe({
  next:()=>{
    this.GetAll();

    this.Router.navigateByUrl("/deshboard/Badges");

  }
});
}
//================================================================================
onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;

      this.GetAll();
    }
  }
}

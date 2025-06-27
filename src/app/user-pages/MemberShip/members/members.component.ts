import { Component } from '@angular/core';
import { MemberShipService } from '../../../Services/member-ship.service';
import { MemberShipData } from '../../../Models/MemberShip';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-members',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
Members:MemberShipData[]= [];
page:number=1;
PageSize:number=10;
Total:number =0;
Search:string = "";
constructor(private MemberShipService:MemberShipService,private Router:Router){
this.GetAll();
}

//====================================================================================
GetAll(){
this.MemberShipService.GetAll(this.page,this.PageSize,this.Search).subscribe({
  next:(value)=>{
    this.Members = value.data;
    this.page = value.currentPage;
    this.PageSize = value.pageSize;
    this.Total = value.totalPages;

  }
})
}

//====================================================================================
OnSerach(e:any){
  let word = e.target.value;
  this.Search = word;
  this.GetAll();


}
//====================================================================================
Delete(id:string){
this.MemberShipService.Delete(id).subscribe({
  next:()=>{
    this.GetAll();

    this.Router.navigateByUrl("/userPage/MemberShips");

  }
});

}







}

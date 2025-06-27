import { Component } from '@angular/core';
import { UserBadge } from '../../../Models/UserBadge';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-badges',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './user-badges.component.html',
  styleUrl: './user-badges.component.css'
})
export class UserBadgesComponent {
UserBadges:UserBadge[]=[];
page:number=1;
pageSize:number=50;
total:number=0;
constructor(private userBadgeService:UserBadgeService,private Router:Router){

this.GetAll();

}

//=========================================================================
GetAll(){
  this.userBadgeService.GetAll(this.page,this.pageSize,"",0,0).subscribe({
    next:(value)=>{
      this.UserBadges = value.data;
    }
  })
}
//=========================================================================
Delete(id:number){
  this.userBadgeService.Delete(id).subscribe({
    next:()=>{
      this.GetAll();
  
      this.Router.navigateByUrl("/deshboard/UserBadge");
  
    }
  });
  }
}

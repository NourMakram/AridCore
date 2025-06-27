import { Component } from '@angular/core';
import { BadgesService } from '../../../Services/badges.service';
import { Badge } from '../../../Models/Badge';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-badges',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './show-badges.component.html',
  styleUrl: './show-badges.component.css'
})
export class ShowBadgesComponent {

  Badges:Badge[]=[];
  constructor(private BadgeService:BadgesService,private Router:Router){
  
    this.GetAll();
  }
  //================================================================================
  GetAll(){
    this.BadgeService.GetAllList().subscribe({
      next:(value)=>{
        console.log(value)
        this.Badges = value;
        
      }
    });
    
  
  }
  //================================================================================

}

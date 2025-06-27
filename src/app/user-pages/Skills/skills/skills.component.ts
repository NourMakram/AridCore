import { Component } from '@angular/core';
import { SkillsService } from '../../../Services/skills.service';
import { Skill } from '../../../Models/Skill';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skills',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
 page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
constructor(private skillService:SkillsService){
  this.getAll();
}
  
  
  
Skills: Skill[] = [];
    getAll() {
      this.skillService.GetAll(this.page, this.pageSize).subscribe({
        next: (value) => {
          // console.log(value);
          this.Skills = value.data;
          this.page = value.currentPage;
          this.pageSize = value.pageSize;
          this.Total = value.totalPages;
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
    //=============================================================================================
    Delete(id: number) {
      this.skillService.Delete(id).subscribe({
        next: () => {
          this.getAll();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }


}

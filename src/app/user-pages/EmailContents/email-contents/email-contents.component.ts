import { Component } from '@angular/core';
import { EmailContent } from '../../../Models/EmailContent';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-contents',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './email-contents.component.html',
  styleUrl: './email-contents.component.css'
})
export class EmailContentsComponent {
  EmailContents:EmailContent[]=[];
  Page:number=1;
  PageSize:number=40;
  Total:number=0;
  constructor(private emailContentsService:EmailContentsService){
    this.getAll();
  }
  getAll(){
    this.emailContentsService.GetAll(this.Page,this.PageSize).subscribe({
      next:(value)=>{
        this.EmailContents=value.data;
        this.Page = value.currentPage;
        this.PageSize = value.pageSize;
        this.Total = value.totalPages;
      }
    })
  }
  //=============================================================================================
  Delete(id: number) {
    this.emailContentsService.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

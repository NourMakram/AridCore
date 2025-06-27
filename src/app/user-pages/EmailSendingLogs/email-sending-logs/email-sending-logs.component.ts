import { Component } from '@angular/core';
import { EmailSendingLogsService } from '../../../Services/email-sending-logs.service';
import { EmailSendingLog } from '../../../Models/EmailSendingLog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-sending-logs',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './email-sending-logs.component.html',
  styleUrl: './email-sending-logs.component.css'
})
export class EmailSendingLogsComponent {
  EmailSendingLogs:EmailSendingLog[]=[];
  Page:number=1;
  PageSize:number=40;
  Total:number=0;
  constructor(private emailSendingLogsServic:EmailSendingLogsService){
    this.getAll();
  }
  getAll(){
    this.emailSendingLogsServic.GetAll(this.Page,this.PageSize).subscribe({
      next:(value)=>{
        this.EmailSendingLogs=value;
        // this.Page = value.currentPage;
        // this.PageSize = value.pageSize;
        // this.Total = value.totalPages;
      }
    })
  }
  //=============================================================================================
  Delete(id: number) {
    this.emailSendingLogsServic.Delete(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

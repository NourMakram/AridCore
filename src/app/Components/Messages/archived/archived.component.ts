import { Component } from '@angular/core';
import { Message } from '../../../Models/Message';
import { MessageService } from '../../../Services/message.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.css'
})
export class ArchivedComponent {
userId:any;
  page:number=1;
  total:number= 0;
  pageSize:number =10;
  PageCounts:number = 0;
  hasPrev:boolean = false;
  hasnext:boolean = false;
constructor(private messageService:MessageService,private TokenService:TokenServiceService){
}
  ngOnInit(): void {
    this.userId = this.TokenService.GetUserId();

    if(this.userId!=undefined){
       
       this.GetAll(this.userId);
     }

}

Messages:Message[]=[];
GetAll(userId:string){
  this.messageService.GetArchiveMessages(userId,this.page,this.pageSize).subscribe({
    next:(value)=>{
      this.Messages = value.data;
       this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext = value.hasNextPage;
    },
    error:(error)=>{
     console.log(error);
    }
  })
}
//====================================================================================================
ReadMessge(id:number){
  this.messageService.Read(id).subscribe({
    next:(value)=>{
      this.GetAll(this.userId);
    },
    error:(error)=>{
      console.log(error)
    }
  })
}
//====================================================================================================
Delete(id:number){
  this.messageService.Delete(id).subscribe({
    next:(value)=>{
      this.GetAll(this.userId);
    },
    error:(error)=>{
      console.log(error)
    }
  })
}
//================================================================================================
GetPrevPage(){
if(this.hasPrev&& this.page > 1){
      this.page -= 1 ;
      this.GetAll(this.userId);
    }
}
//================================================================================================

GetNextPage(){
if(this.hasnext){
      this.page += 1 ;
      this.GetAll(this.userId);

    }
}
}

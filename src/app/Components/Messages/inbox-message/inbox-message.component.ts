import { Component, OnInit } from '@angular/core';
import { Message } from '../../../Models/Message';
import { MessageService } from '../../../Services/message.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inbox-message',
  standalone: true,
  imports: [CommonModule,MatPaginator,RouterLink],
  templateUrl: './inbox-message.component.html',
  styleUrl: './inbox-message.component.css'
})
export class InboxMessageComponent implements OnInit{
  userId:any;
  page:number=1;
  total:number= 0;
  pageSize:number =10;
  PageCounts:number = 0;
  hasPrev:boolean = false;
  hasnext:boolean = false;
  RoleName:any ;
constructor(private messageService:MessageService,private TokenService:TokenServiceService,private Router:Router){
}
  ngOnInit(): void {
    this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

    if(this.userId!=undefined){
       
       this.GetAll(this.userId);
     }

}

Messages:Message[]=[];
GetAll(userId:string){
  this.messageService.GetIncomingMessages(userId,this.page,this.pageSize).subscribe({
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
//================================================================================================
GetDetailsPage(id:number){
   if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl(`/clientPage/Messages/Details/${id}`);

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl(`/userPage/Messages/Details/${id}`);

     }
     }
}


}

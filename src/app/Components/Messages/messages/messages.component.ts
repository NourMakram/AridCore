import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMessageComponent } from '../add-message/add-message.component';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../Services/message.service';
import { TokenServiceService } from '../../../Services/token-service.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent  implements OnInit{
  userId:any;
  RoleName:any;
constructor(private dialog:MatDialog,private MessageService:MessageService,
  private tokenService:TokenServiceService,private Router:Router){

}
  ngOnInit(): void {
    this.userId = this.tokenService.GetUserId();
      this.RoleName = this.tokenService.GetRole();

     if(this.userId !=undefined){
      this.GetCount(this.userId);
     }

  }

  //=======================================================================
  MessageCount:any;
  GetCount(userId:string){
    this.MessageService.GetCountMessage(userId).subscribe({
      next:(value)=>{
           this.MessageCount = value;
      }
    })
  }

OpenAddDialog(){
    const dialogRef = this.dialog.open(AddMessageComponent, {
        width: '560px',
        data: {  }
      });
   dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result)

    if (result == true) {

        let Message = "تم ارسال الرسالة بنجاح";
        this.NotificationMessage(Message, "success");
 
      }
      else if(result == false){
        let Message = "فشل ارسال الرسالة حاول مرة اخري";
        this.NotificationMessage(Message, "error");
      }

    }

    );
}

//==================================================================================================

  swalWithBootstrapButtons: any = Swal.mixin({
    customClass: {
      confirmButton: "btn text-white px-3 mx-2",
      cancelButton: "btn text-white px-3 mx-2"
    },
    buttonsStyling: true
  });
  NotificationMessage(title: string, icon: string) {
    this.swalWithBootstrapButtons.fire({
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 3000

    });
  }

  //===================================================================================
  GetArchiveMessage(){
 if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl(`/clientPage/Messages/Archive`);

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl(`/userPage/Messages/Archive`);

     }
     }
  }
  //===================================================================================
GetSentMessages(){
if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl(`/clientPage/Messages/SentMessages`);

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl(`/userPage/Messages/SentMessages`);

     }
     }
  }
  //===================================================================================
 GetInboxMessages(){
if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl(`/clientPage/Messages/InboxMessages`);

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl(`/userPage/Messages/InboxMessages`);

     }
     }
  } 
}

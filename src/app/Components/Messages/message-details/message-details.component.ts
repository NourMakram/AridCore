import { Component, OnInit } from '@angular/core';
import { MessageDetails, MessageReply } from '../../../Models/Message';
import { MessageService } from '../../../Services/message.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddMessageComponent } from '../add-message/add-message.component';
import { AddreplyMessgeComponent } from '../addreply-messge/addreply-messge.component';
import { __asyncValues } from 'tslib';
import { CommonModule } from '@angular/common';
import { TokenServiceService } from '../../../Services/token-service.service';

@Component({
  selector: 'app-message-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './message-details.component.html',
  styleUrl: './message-details.component.css'
})
export class MessageDetailsComponent implements OnInit {
MessagesReplies:MessageReply[]=[];
id:any ;
RoleName:any;
constructor(private MessageService:MessageService,private activeRouter:ActivatedRoute,
  private dialog:MatDialog,private Router:Router,private TokenService:TokenServiceService
) {
    this.RoleName = this.TokenService.GetRole();

  
}
  ngOnInit(): void {
     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);
        this.GetReplies(this.id);
      }
  
    });
  }

//========================================================================================================
MessageDetails :MessageDetails = {} as MessageDetails;
Get(id:number){
  this.MessageService.Details(id).subscribe({
    next:(value)=>{
          this.MessageDetails = value;
    }
  })
}
//========================================================================================================
GetReplies(id:number){
  this.MessageService.GetMessageReplies(id).subscribe({
    next:(value)=>{
      this.MessagesReplies = value
    }
  })
}
//========================================================================================================
OpenAddDialog(id:number){
    const dialogRef = this.dialog.open(AddreplyMessgeComponent, {
        width: '560px',
        data: {MessageId:id  }
      });
dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result)

    if (result == true) {

        let Message = "تم ارسال الرسالة بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetReplies(this.id);
 
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
  //==============================================================================
 GoBack(){
   if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl(`/clientPage/Messages`);

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl(`/userPage/Messages`);

     }
     }
 }

}

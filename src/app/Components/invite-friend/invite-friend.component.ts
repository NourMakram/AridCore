import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../Services/token-service.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invite-friend',
  standalone:true,
 imports: [CommonModule, RouterLink, ReactiveFormsModule,], 
  templateUrl: './invite-friend.component.html',
  styleUrl: './invite-friend.component.css'
})
export class InviteFriendComponent {
InviteFriendForm:FormGroup;
  userId:any;
  id:any;
  RegisterLink:string="";
  ErrorMessage:string = "";
constructor(private fb:FormBuilder,private activeRouter:ActivatedRoute,
  private auhtService:AuthService,
  private TokenService:TokenServiceService, private Router:Router){
  this.userId = this.TokenService.GetUserId();

  if(this.userId != undefined){
  this.RegisterLink = `http://localhost:4200/Register/${this.userId}`;
  }
  
  this.InviteFriendForm = this.fb.group({
     friendEmail:['',[Validators.required,Validators.email]],
     friendName:['',Validators.required],
     userId:[this.userId,Validators.required]
  });
  }



Submit(){
  if (this.InviteFriendForm.valid) {
    this.auhtService.InviteFriend(this.InviteFriendForm?.value).subscribe({
      next: (value) => {
         console.log("Success")
           let Message = "تم  ارسال الدعوة للباحث  بنجاح ";
          this.NotificationMessage(Message, "success");
        
      },
      error: (error) => {
         let Message = "حدث خطأ اثناء ارسال الدعوة للباحث حاول مرة اخري";
                       this.NotificationMessage(Message, "error");
        console.log(error);
  
      }
    })
  }
  else {
    Object.keys(this.InviteFriendForm.controls).forEach(field => {
      const control = this.InviteFriendForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

}
//================================================================================
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

}

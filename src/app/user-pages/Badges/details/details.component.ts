import { Component } from '@angular/core';
import { Badge, BadgeDetails } from '../../../Models/Badge';
import { BadgesService } from '../../../Services/badges.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { UserBadge, UserBadgeDetails } from '../../../Models/UserBadge';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
 import { MatDialog } from '@angular/material/dialog';
import { AddInnovativeIdeaComponent } from '../../UserBadges/add-innovative-idea/add-innovative-idea.component';
import { IssueCertificateComponent } from '../../../client-pages/Certificates/issue-certificate/issue-certificate.component';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
  
@Component({
  selector: 'app-details',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
Badge:BadgeDetails = {} as BadgeDetails;
id:any;
userId:any;
InvitationLink:string="";
constructor(private BadgeService:BadgesService,private activeRouter:ActivatedRoute,
private UserBadgeService:UserBadgeService,private TokenService:TokenServiceService,
private dialog:MatDialog,private router:Router,private aridCertificateService:AridCertificateService
){

  this.userId = this.TokenService.GetUserId();
if(this.userId != undefined){
  this.InvitationLink = `http://localhost:4200/Register/${this.userId}`;
  }  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    this.Get(this.id);
    this.hasBadge(this.userId,this.id);

  });

}


//================================================================================
Get(id:number){
  this.BadgeService.Get(id).subscribe({
    next:(value)=>{
      this.Badge = value;
    }
  })
}
//================================================================================
userBadge:UserBadgeDetails = {} as UserBadgeDetails;
hasBadge(userId:string,id:number){
  this.UserBadgeService.HasBadge(userId,id).subscribe({
    next:(value)=>{
      this.userBadge = value;
    }
  })
}
//====================================================================================
Conditions:string[]=[];
Apply(){
  this.UserBadgeService.Apply(this.userId, this.Badge.id).subscribe({
    next:(value)=>{
      this.Conditions = value;
      if(this.Conditions.length  == 0){
        console.log(this.userId)

       if(this.userBadge!=null && this.userBadge.isRejected == true ){
          console.log("Reply")

          this.ReApply(this.userId,this.Badge.id);
       }
       else if(this.userBadge == null){
        console.log("Badge Application")

         this.BadgeApplication(this.userId,this.Badge.id);
       }

      }
      
    }
  })
}
//====================================================================================
ReApply(userId:string,badgeId:number){
  this.UserBadgeService.ReApply(userId,badgeId).subscribe({
    next:(value)=>{
let Message = "تم   تقديم الحصول على الوسام";
        this.NotificationMessage(Message, "success");    },
     error:(error)=>{
 let Message = "فشل تقديم الحصول على الوسام";
        this.NotificationMessage(Message, "error");
           }
  })
}
//====================================================================================
BadgeApplication(userId:string,badgeId:number){
  this.UserBadgeService.BadgeApplication(userId,badgeId).subscribe({
    next:(value)=>{
        let Message = "تم   تقديم الحصول على الوسام";
        this.NotificationMessage(Message, "success");
    },
     error:(error)=>{
      let Message = "فشل تقديم الحصول على الوسام";
        this.NotificationMessage(Message, "error");
      console.log("فشل تقديم الحصول على الوسام")
     }
  })
}
//====================================================================
OpenIninvteDialog(id:number){
   const dialogRef = this.dialog.open(AddInnovativeIdeaComponent, {
        width: '500px',
        data: {id:id }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
              console.log(result)
  
      if (result == true) {
  
          let Message = "تم تقديم فكرتك بنجاح";
          this.NotificationMessage(Message, "success");
   
        }
        else if(result == false){
          let Message = "عذرا حدث خطأ اثناء ارسال البيانات حاول مرة اخري";
          this.NotificationMessage(Message, "error");
        }
  
      }
  
      );
}
//======================================================================================================

RedirectToCertificate(templateId:string,language:number){
   this.aridCertificateService.GetCertificate(this.userId,templateId).subscribe({
        next:(value:any)=>{
          if(value != null){
            console.log(value);
           this.router.navigateByUrl(`/clientPage/Certificates/Details/${value.id}`);

          }
          else{
            this.router.navigate(['clientPage/Certificates/Issue'], { queryParams: { templateId: templateId, language: language }});

          }

        },
        error:(error)=>{
           console.log(error);
        }
    });
}
  
//====================================================================
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

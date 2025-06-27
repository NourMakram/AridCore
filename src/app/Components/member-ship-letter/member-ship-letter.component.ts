import { Component, OnInit } from '@angular/core';
import { BadgesService } from '../../Services/badges.service';
import { MemberShipService } from '../../Services/member-ship.service';
import { UserBadgeService } from '../../Services/user-badge.service';
import { TokenServiceService } from '../../Services/token-service.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-ship-letter',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './member-ship-letter.component.html',
  styleUrl: './member-ship-letter.component.css'
})
export class MemberShipLetterComponent implements OnInit {
HasAridBadge :boolean=false;
userId:any;
  constructor(private TokenService:TokenServiceService,private userBadgeService:UserBadgeService,
    private memberShipService:MemberShipService){

  }
  //================================================================================================================
  //28  هل حصل على وسام عضوية اريد
  ngOnInit(): void {
    this.userId = this.TokenService.GetUserId();
    if(this.userId != undefined){
      this.hasBadge(this.userId,28)
    }
  }


  //================================================================================================================
  hasBadge(userId:string,badgeId:number){
    this.userBadgeService.HasBadge(userId,badgeId).subscribe({
      next:(value)=>{
        if(value== null){
          this.HasAridBadge = false;
        }
        else{
         this.HasAridBadge = true;

        }
       }
    })
  }
  //==================================================================================================
 ExportMemberShipLetter(): void {
  this.memberShipService.ExportMemeberShipLetter(this.userId).subscribe(
    (response: Blob) => {
      let Message = "جاري تحميل الملف، يرجى الانتظار .....";
      this.NotificationMessage(Message, "success");

      // Create a Blob with image type
      const blob = new Blob([response], { type: 'image/jpeg' }); // Assuming the file is JPEG
      const link = document.createElement('a');

      // Create a URL for the image blob and set it as the href
      link.href = URL.createObjectURL(blob);

      // Set the image file name (you can change the extension if it's PNG or another image type)
      link.download = `Letter_${this.userId}.jpg`;

      // Programmatically click the link to trigger the download
      link.click();
    },
    (error) => {
      let Message = "عذراً، حدثت مشكلة أثناء التحميل.";
      this.NotificationMessage(Message, "error");
      console.error('Error downloading Letter', error);
    }
  );
}
 //=================================================================================================
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


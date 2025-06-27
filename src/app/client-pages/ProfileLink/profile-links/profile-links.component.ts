import { Component } from '@angular/core';
import { ProfileLinkService } from '../../../Services/profile-link.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ProfileLink } from '../../../Models/ProfileLink';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileLinksComponent } from '../add-profile-links/add-profile-links.component';
import { EditProfileLinksComponent } from '../edit-profile-links/edit-profile-links.component';

@Component({
  selector: 'app-profile-links',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './profile-links.component.html',
  styleUrl: './profile-links.component.css'
})
export class ProfileLinksComponent {
page: number = 1;
    pageSize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private profileLinkService:ProfileLinkService,private TokenService:TokenServiceService,
  public dialog: MatDialog
){
  this.userId = this.TokenService.GetUserId();
  if(this.userId!=null){
      this.GetToUser(this.userId);

  }
 }
  
  
  
 ProfileLinks: ProfileLink[] = [];
    GetToUser(userId:string) {
      this.profileLinkService.GetToUser(userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.ProfileLinks = value.data;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    //=============================================================================================
    OpenAddDialog(){
      const dialogRef = this.dialog.open(AddProfileLinksComponent, {
            width: '560px',
            data: {  }
          });
          dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result)
      
          if (result == true) {
      
              let Message = "تم اضافة البيانات بنجاح";
              this.NotificationMessage(Message, "success");
              this.GetToUser(this.userId);
      
            }
            else if(result == false){
              let Message = "فشل اضافة البيانات حاول مرة اخري";
              this.NotificationMessage(Message, "error");
            }
      
          }
      
          );
    }
    //=============================================================================================

   openEditDialog(id: number) {
       const dialogRef = this.dialog.open(EditProfileLinksComponent, {
         width: '560px',
         data: { id: id }
       });
       dialogRef.afterClosed().subscribe((result:any) => {
         console.log(result)
         if (result == true) {
   
           let Message = "تم تعديل البيانات بنجاح";
           this.NotificationMessage(Message, "success");
           this.GetToUser(this.userId);
   
         }
         else if(result == false){
           let Message = "فشل تعديل البيانات حاول مرة اخري";
           this.NotificationMessage(Message, "error");
         }
   
       }
   
       );
     }
    //=============================================================================================
    Delete(id: number) {
      this.profileLinkService.Delete(id).subscribe({
        next: () => {
          let Message = "تم  حذف البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");

          this.GetToUser(this.userId);
        },
        error: (error) => {
          let Message = "حدث خطأ اثناء حذف البيانات  حاول مرة اخري";
          this.NotificationMessage(Message, "error");

          console.log(error)
        }
      })
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

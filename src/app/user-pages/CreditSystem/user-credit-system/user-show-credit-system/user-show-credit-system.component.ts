import { Component } from '@angular/core';
import { CreditSystem } from '../../../../Models/CreditSystem';
import { CreditSystemService } from '../../../../Services/credit-system.service';
import { TokenServiceService } from '../../../../Services/token-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-show-credit-system',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './user-show-credit-system.component.html',
  styleUrl: './user-show-credit-system.component.css'
})
export class UserShowCreditSystemComponent {
page: number = 1;
    clientPageize: number = 10;
    Total: number = 0;
    search: string = "";
    userId:any;
constructor(private creditSystemService:CreditSystemService,private tokenServiceService:TokenServiceService){
  this.userId = this.tokenServiceService.GetUserId();
if(this.userId != null){
  this.GetAll(this.userId);

}
 }
//=============================================================================================
  
CreditSystems: CreditSystem[] = [];
    GetAll(userId:string) {
      this.creditSystemService.GetByUserId(this.userId).subscribe({
        next: (value) => {
          // console.log(value);
          this.CreditSystems = value;
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
   
  //=============================================================================================
    Delete(id: number) {
      this.creditSystemService.Delete(id).subscribe({
        next: () => {
          let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
          this.GetAll(this.userId);
        },
        error: (error) => {
          
        let Message = "فشل حذف البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
          console.log(error)
        }
      })
    }
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

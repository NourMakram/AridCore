import { Component, OnInit } from '@angular/core';
import { Address } from '../../../Models/Address';
import { AddressService } from '../../../Services/address.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css'
})
export class UserAddressComponent implements OnInit {
Addresses :Address [] =[];
userId:any;
constructor(private AddressService:AddressService,private TokenService:TokenServiceService){

}
  ngOnInit(): void {
    this.userId = this.TokenService.GetUserId();
    if (this.userId != undefined) {
      this.GetAllToUser(this.userId);
    }

  }


  //=================================================================================================
  GetAllToUser(userId:string){
    this.AddressService.GetByUserId(userId).subscribe({
      next:(value)=>{
        this.Addresses = value;
      }
    })
  }

//====================================================================================================
//=============================================================================================
  Delete(id: number) {
    this.AddressService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        if(this.userId!=undefined){
        this.GetAllToUser(this.userId);

        }
      },
      error: (error) => {
        let Message = "فشل حذف البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
        console.log(error);
      }
    })
  }
  //================================================================================================
 


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

}


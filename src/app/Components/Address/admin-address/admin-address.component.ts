import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Address } from '../../../Models/Address';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AddressService } from '../../../Services/address.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-address',
  standalone: true,
  imports: [CommonModule,RouterLink,MatPaginatorModule],
  templateUrl: './admin-address.component.html',
  styleUrl: './admin-address.component.css'
})
export class AdminAddressComponent implements OnInit {
Addresses :Address [] =[];
userId:any;
page :number=1;
pageSize :number = 20;
PageCounts :number = 0;
total :number=0;
hasPrev :boolean=false;
hasnext :boolean=false;
constructor(private AddressService:AddressService,private TokenService:TokenServiceService){

}
  ngOnInit(): void {

        this.GetAll();
    

  }


  //=================================================================================================
  GetAll(){
    this.AddressService.GetAll(this.page,this.pageSize,"").subscribe({
      next:(value)=>{
        this.Addresses = value.data;
         this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext = value.hasNextPage;
      }
    })
  }
 //============================================================================
  onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;

      this.GetAll();
    }
  }
//====================================================================================================
  Delete(id: number) {
    this.AddressService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        if(this.userId!=undefined){
        this.GetAll();

        }
      },
      error: (error) => {
        let Message = "فشل حذف البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
        console.log(error);
      }
    })
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

}



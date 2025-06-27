import { Component } from '@angular/core';
import { AridCertificateService } from '../../../Services/arid-certificate.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Certificate } from '../../../Models/Certificate';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arid-certificates',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule,RouterLink],
  templateUrl: './arid-certificates.component.html',
  styleUrl: './arid-certificates.component.css'
})
export class AridCertificatesComponent {
Id:any;
page:number = 1;
pageSize:number = 10;
hasnext:boolean=false;
hasPrev:boolean = false;
total:number = 0;
PageCounts:number = 0;
constructor(private aridCertificateService:AridCertificateService,private activatedRoute:ActivatedRoute){

  this.activatedRoute.paramMap.subscribe(params => {
      this.Id = params.get('id');
      if (this.Id != 0) {
        this.GetAll(this.Id);

      }

    });
}

//===========================================================================================
  Certificates :Certificate[]=[];

GetAll(templateId:string){
  this.aridCertificateService.GetAll(templateId,this.page,this.pageSize,"").subscribe({
    next:(value)=>{
    this.Certificates =  value.data;
        this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext = value.hasNextPage;
    }
  })
}
//===========================================================================================
 onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;
       
      this.GetAll(this.Id);
      
    }
  }
//===========================================================================================
    Delete(id: number) {
    this.aridCertificateService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetAll(this.Id);
      
      },
      error: (error) => {
        let Message = "فشل حذف البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
        console.log(error);
      }
    })
  }
  //===========================================================================================
  OpenAddDialog(){

  }
//===========================================================================================
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

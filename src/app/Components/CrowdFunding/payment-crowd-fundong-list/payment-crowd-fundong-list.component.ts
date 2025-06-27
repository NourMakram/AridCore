import { Component, OnInit } from '@angular/core';
import { PaymentCrowdFundong } from '../../../Models/PaymentCrowdFunding';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DonateCrowdFundingComponent } from '../donate-crowd-funding/donate-crowd-funding.component';

@Component({
  selector: 'app-payment-crowd-fundong-list',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule,RouterLink,MatDialogModule,MatDialogModule],
  templateUrl: './payment-crowd-fundong-list.component.html',
  styleUrl: './payment-crowd-fundong-list.component.css'
})
export class PaymentCrowdFundongListComponent implements OnInit {
PaymentCrowdFundongList:PaymentCrowdFundong[] = [] ;
page:number=1;
pageSize:number=20;
hasPrev:boolean = false;
hasnext:boolean = false;
PageCounts:number = 0;
total:number=0;
id:any;
constructor(private CrowdFundingService:CrowdFundingService,
  private activeRouter:ActivatedRoute,public dialog: MatDialog){

  
}
  ngOnInit(): void {

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.GetAll(this.id);
        this.Get(this.id);

      }

    });
  }

  //===================================================================================
  GetAll(projectId:number){
    this.CrowdFundingService.GetPaymentsCrowdFunding(projectId,this.page,this.pageSize).subscribe({
      next:(value)=>{
        this.PaymentCrowdFundongList= value.data;
        this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total= value.totalCount;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext=value.hasNextPage ;
      }
    })
  }
//===================================================================================
CrowdFunding:any = {} ;
  Get(id: number) {
    this.CrowdFundingService.Get(id).subscribe({
      next: (value) => {
        this.CrowdFunding= value;
      }
    });
  }
 //===================================================================================
  onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

     this.pageSize = event.pageSize;
      
      this.GetAll(this.id);
    }
  }
//===================================================================================
   openAddDialog() {
      const dialogRef = this.dialog.open(DonateCrowdFundingComponent, {
        width: '560px',
        data: { id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.CrowdFundingService.Donate(result).subscribe({
            next: () => {
              let Message = "تم اضافة البيانات بنجاح";
              this.NotificationMessage(Message, "success");
  
            },
            error: (error) => {
              let Message = "فشل اضافة البيانات حاول مرة اخري";
              this.NotificationMessage(Message, "error");
              console.log(error);
            }
          });
        }
  
      });
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

import { Component, OnInit } from '@angular/core';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { CrowdFunding } from '../../../Models/CrowdFunding';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { DonateCrowdFundingComponent } from '../donate-crowd-funding/donate-crowd-funding.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GenaricModel } from '../../../Models/GenaricModel';

@Component({
  selector: 'app-crowd-funding-managment',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, RouterLink, MatDialogModule],
  templateUrl: './crowd-funding-managment.component.html',
  styleUrl: './crowd-funding-managment.component.css'
})
export class CrowdFundingManagmentComponent implements OnInit {
  CrowdFundingList: CrowdFunding[] = [];
  page: number = 1;
  pageSize: number = 20;
  hasPrev: boolean = false;
  hasnext: boolean = false;
  PageCounts: number = 0;
  total: number = 0;
  constructor(private CrowdFundingService: CrowdFundingService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll() {
    this.CrowdFundingService.GetAll(this.page, this.pageSize,this.ProjectName,this.Stuats).subscribe({
      next: (value) => {
        this.CrowdFundingList = value.data;
        this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
        this.hasPrev = value.hasPreviousPage;
        this.hasnext = value.hasNextPage;
      }
    })
    this.GetCrowdFundingStatus();
  }
  //============================================================================
  CrowdFundingStatus: GenaricModel[] = [];
  GetCrowdFundingStatus() {
    this.CrowdFundingService.CrowdFundingStauts().subscribe({
      next: (value) => {
        this.CrowdFundingStatus = value;
      }
    });
  }
  //============================================================================
  Stuats: number = 0;
  FilterByProjectStuats(e: any) {
    this.Stuats = e.target.value;
    this.ProjectName="";
    console.log(this.Stuats);

    this.GetAll();
  }
  //============================================================================
  ProjectName: string = "";
  FilterByProjectName(e: any) {
    this.ProjectName = e.target.value;
    this.Stuats = 0;
    this.GetAll();
  }
  //============================================================================
  onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;

      this.GetAll();
    }
  }

  //=============================================================================================
  Delete(id: number) {
    this.CrowdFundingService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetAll();
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

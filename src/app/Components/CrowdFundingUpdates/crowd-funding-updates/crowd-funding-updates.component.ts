import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
   import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { CrowdFundingUpdateService } from '../../../Services/crowd-funding-update.service';
import { CrowdFundingUpdate } from '../../../Models/CrowdFundingUpdate';
 import { EditCrowdFundingUpdateComponent } from '../edit-crowd-funding-update/edit-crowd-funding-update.component';
import { AddCrowdFundingUpdateComponent } from '../add-crowd-funding-update/add-crowd-funding-update.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crowd-funding-updates',
  standalone: true,
  imports: [CommonModule,RouterLink,MatPaginator],
  templateUrl: './crowd-funding-updates.component.html',
  styleUrl: './crowd-funding-updates.component.css'
})
export class CrowdFundingUpdatesComponent {
CrowdFundingUpdates: CrowdFundingUpdate[] = [];
  page: number = 1;
  pageSize: number = 20;
  hasPrev: boolean = false;
  hasnext: boolean = false;
  PageCounts: number = 0;
  total: number = 0;
  projectId: any;
  constructor(private crowdFundingUpdateService: CrowdFundingUpdateService,
    public dialog: MatDialog, private activeRouter: ActivatedRoute,
    private CrowdFundingService:CrowdFundingService) {


  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId != 0) {
        this.GetAll(this.projectId);
        this.Get(this.projectId);

      }

    });
  }

  GetAll(projectId: number) {
    this.crowdFundingUpdateService.GetAll(projectId, this.page, this.pageSize).subscribe({
      next: (value) => {
        this.CrowdFundingUpdates = value.data;
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
      if (this.projectId != 0) {

      this.GetAll(this.projectId);
      }
    }
  }

  //=============================================================================================
  Delete(id: number) {
    this.crowdFundingUpdateService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
         if (this.projectId != 0) {

       this.GetAll(this.projectId);
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
  openAddDialog() {
    const dialogRef = this.dialog.open(AddCrowdFundingUpdateComponent, {
      width: '560px',
      data: { projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result)

    if (result == true) {

        let Message = "تم اضافة البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetAll(this.projectId);

      }
      else if(result == false){
        let Message = "فشل اضافة البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
      }

    }

    );
  }



  //================================================================================================
  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditCrowdFundingUpdateComponent, {
      width: '560px',
      data: { projectId:this.projectId,id: id }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result)
      if (result == true) {

        let Message = "تم تعديل البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetAll(this.projectId);

      }
      else if(result == false){
        let Message = "فشل تعديل البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
      }

    }

    );
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

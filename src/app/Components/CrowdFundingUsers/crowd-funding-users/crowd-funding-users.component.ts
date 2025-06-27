import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CrowdFundingUser } from '../../../Models/CrowdFundingUser';
import { CrowdFundingUsersService } from '../../../Services/crowd-funding-users.service';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { AddCrowdFundingUserComponent } from '../add-crowd-funding-user/add-crowd-funding-user.component';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-crowd-funding-users',
  standalone: true,
  imports: [CommonModule,RouterLink,MatPaginator],
  templateUrl: './crowd-funding-users.component.html',
  styleUrl: './crowd-funding-users.component.css'
})
export class CrowdFundingUsersComponent {
CrowdFundingUsers: CrowdFundingUser[] = [];
  page: number = 1;
  pageSize: number = 20;
  hasPrev: boolean = false;
  hasnext: boolean = false;
  PageCounts: number = 0;
  total: number = 0;
  projectId: any;
  constructor(private crowdFundingUsersService: CrowdFundingUsersService,
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
    this.crowdFundingUsersService.GetAll(projectId, this.page, this.pageSize).subscribe({
      next: (value) => {
        this.CrowdFundingUsers = value.data;
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
    this.crowdFundingUsersService.Delete(id).subscribe({
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
    const dialogRef = this.dialog.open(AddCrowdFundingUserComponent, {
      width: '400px',
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

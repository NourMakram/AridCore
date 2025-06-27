import { Component } from '@angular/core';
import { RoleService } from '../../../Services/role.service';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../Models/Role';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddCrowdFundingContributionTypeComponent } from '../../../Components/CrowdFundingContributionTypes/add-crowd-funding-contribution-type/add-crowd-funding-contribution-type.component';
import { EditCrowdFundingContributionTypeComponent } from '../../../Components/CrowdFundingContributionTypes/edit-crowd-funding-contribution-type/edit-crowd-funding-contribution-type.component';
import { AddRoleComponent } from '../add-role/add-role.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-roles',
  imports:[RouterLink,CommonModule,ReactiveFormsModule,DialogModule],
  standalone:true,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  page: number = 1;
  pageSize: number = 10;
  search: string = "";
  PageCounts :number = 0;
  total :number = 0;
  constructor(private RoleService: RoleService, private Router: Router, public dialog: MatDialog) {
    this.getAll();
   }



  Roles: Role[] = [];
  getAll() {
    this.RoleService.GetAll(this.page, this.pageSize, this.search).subscribe({
      next: (value) => {
         this.Roles = value;
        // this.page = value.currentPage;
        // this.pageSize = value.pageSize;
        // this.PageCounts = value.totalPages;
        // this.total = value.totalCount;
 
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
 
  //=============================================================================================
  Delete(id: string) {
    this.RoleService.Delete(id).subscribe({
      next: () => {
        let Message = "تم حذف البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.getAll();
      },
      error: (error) => {
          let Message = "فشل حذف البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
        console.log(error)
      }
    })
  }
  //==================================================================================
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
  
  
  //========================================================================================
  
    openAddDialog() {
      const dialogRef = this.dialog.open(AddRoleComponent, {
        width: '450px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {
              console.log(result)
  
      if (result == true) {
  
          let Message = "تم اضافة البيانات بنجاح";
          this.NotificationMessage(Message, "success");
          this.getAll();
  
        }
        else if(result == false){
          let Message = "فشل اضافة البيانات حاول مرة اخري";
          this.NotificationMessage(Message, "error");
        }
  
      }
  
      );
    }
  
  
  
    //================================================================================================
    openEditDialog(id: string) {
      const dialogRef = this.dialog.open(EditRoleComponent, {
        width: '450px',
        data: { id: id }
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        console.log(result)
        if (result == true) {
  
          let Message = "تم تعديل البيانات بنجاح";
          this.NotificationMessage(Message, "success");
          this.getAll();
  
        }
        else if(result == false){
          let Message = "فشل تعديل البيانات حاول مرة اخري";
          this.NotificationMessage(Message, "error");
        }
  
      }
  
      );
    }
  
  //===================================================================================
}

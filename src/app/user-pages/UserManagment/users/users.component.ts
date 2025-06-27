import { Component } from '@angular/core';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { Router, RouterLink } from '@angular/router';
import { UserModel, userModel2 } from '../../../Models/UserModel';
import { RoleService } from '../../../Services/role.service';
import { Role } from '../../../Models/Role';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterLink,MatPaginatorModule],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  PageCounts: number = 0;
  search: string = "";
  constructor(private userManagmentService: UserManagmentService, private Router: Router, private RoleService: RoleService) {
    this.getAll();
    this.GetRoles();
  }



  Users: userModel2[] = [];
  getAll() {
    this.userManagmentService.users(this.page, this.pageSize, this.search, this.Role).subscribe({
      next: (value) => {
        // console.log(value);
        this.Users = value.data;
        this.page = value.currentPage;
        this.pageSize = value.pageSize;
        this.PageCounts = value.totalPages;
        this.total = value.totalCount;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  //=============================================================================================
  Role: string = "";
  FilterByRole(e: any) {
    this.Role = e.target.value;
    console.log("lllll", this.Role, e.target.value);
    this.search = "";
    this.page = 1;
    this.getAll();
  }
  //=============================================================================================
  FilterByName(e: any) {
    this.search = e.target.value;
    this.Role = "";
    this.page = 1;
    this.getAll();
  }
  //=============================================================================================
  Roles: Role[] = [];
  GetRoles() {
    this.RoleService.GetRoles().subscribe({
      next: (value) => {
        this.Roles = value;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  //=============================================================================================
  Delete(id: string) {
    this.userManagmentService.Delete(id).subscribe({
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
    //=================================================================================================
onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;

      this.getAll();
    }
  }
  //=================================================================================================
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

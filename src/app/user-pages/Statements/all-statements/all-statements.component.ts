import { Component } from '@angular/core';
import { StatementService } from '../../../Services/statement.service';
 import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddStatementComponent } from '../add-statement/add-statement.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Statement } from '../../../Models/Statement';

@Component({
  selector: 'app-all-statements',
  standalone: true,
  imports: [CommonModule,RouterLink,MatPaginatorModule],
  templateUrl: './all-statements.component.html',
  styleUrl: './all-statements.component.css'
})
export class AllStatementsComponent {
page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  PageCounts:number = 0;
  userId: any;
  constructor(private StatementService: StatementService,private dialog:MatDialog) {

  }
  ngOnInit(): void {
     this.GetAll();
  }


  //==============================================================================================
  Statements: Statement[]=[];
  search:string = "";
  GetAll() {
    this.StatementService.GetAll(this.page, this.pageSize,this.search)
      .subscribe({
        next: (value) => {
          this.Statements = value.data;
          this.page = value.currentPage;
          this.pageSize = value.pageSize;
          this.total = value.totalCount;
          this.PageCounts = value.totalPages;


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
    //=============================================================================================
  Delete(id: number){
     this.StatementService.Delete(id).subscribe({
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
     });
  }
  //================================================================================================
  openAddDialog() {
    const dialogRef = this.dialog.open(AddStatementComponent, {
      width: '560px',
      data: { }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    //  console.log("Result",result)

    if (result == true) {

        let Message = "تم اضافة البيانات بنجاح";
        this.NotificationMessage(Message, "success");
        this.GetAll( );

      }
      else if(result == false){
        let Message = "فشل اضافة البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
      }

    }

    );
  }
//================================================================================================
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


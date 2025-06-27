import { Component, OnInit } from '@angular/core';
import { StatementService } from '../../../Services/statement.service';
import { Statement } from '../../../Models/Statement';
import { TokenServiceService } from '../../../Services/token-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-statements',
  standalone: true,
  imports: [RouterLink,CommonModule,MatPaginatorModule],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.css'
})
export class StatementsComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  PageCounts:number = 0;
  userId: any;
  constructor(private StatementService: StatementService, private TokenService: TokenServiceService) {

  }
  ngOnInit(): void {
    this.userId = this.TokenService.GetUserId();
    if (this.userId != undefined) {
      this.GetByUserId(this.userId);
    }
  }


  //==============================================================================================
  Statements: Statement[] = [];
  GetByUserId(userId: string) {
    this.StatementService.GetByUserId(userId, this.page, this.pageSize)
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
         
  
        this.GetByUserId(this.userId);
        
      }
    }
  
}

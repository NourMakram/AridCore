import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RoleService } from '../Services/role.service';
import { forkJoin, map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../Services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { UserModel } from '../Models/UserModel';
 import { ProjectService } from '../Services/project.service';
import { UserManagmentService } from '../Services/user-managment.service';
import { NavbarComponent } from '../client-pages/navbar/navbar.component';
 import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';


@Component({
  selector: 'app-user-pages',
  standalone: true,
  imports: [
    RouterModule, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SidebarComponent,
    FooterComponent,
    RouterOutlet,
    AdminNavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-pages.component.html',
  styleUrl: './user-pages.component.css'
})
export class UserPagesComponent implements OnInit {

  panelOpenState = false;




  drawerOpened = true;
  IsLogin: boolean = false;

  Permissions: string[] = [];
  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef, private AuthService: AuthService, private RoleService: RoleService,
    private breakpointObserver: BreakpointObserver, private Router: Router, private userManagmentService: UserManagmentService) {

  }
  isSidebarOpened: boolean = false;

  sidenavMode: 'side' | 'over' = 'over';



  // Optional: This method can be used to handle toggle if needed
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }


  onSidebarToggle() {
    this.isSidebarOpened = false; // Close the sidebar
  }

  w3_open() {
    document.getElementById("mySidebar")!.style.display = "block";
    document.getElementById("main")!.style.marginRight = "250px";
  }

  w3_close() {
    document.getElementById("mySidebar")!.style.display = "none";
    document.getElementById("main")!.style.marginRight = "0";
  }

  ////////////////////////////////////////////////////
  userInfo: UserModel = {} as UserModel;
  userId: string | null = null;
  ////////////////////////////////////////////////////
  ngOnInit(): void {

    ///////////////////////////////////////////////
    



  }









     


     

  


  
  
}














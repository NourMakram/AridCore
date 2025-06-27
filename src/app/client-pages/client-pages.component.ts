import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
 import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserModel } from '../Models/UserModel';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
 import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@Component({
  selector: 'app-client-pages',
  standalone: true,
  imports: [RouterModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterLink, MatDialogModule,
    RouterOutlet,RouterLink,FooterComponent,SidebarComponent,NavbarComponent
  ],
  templateUrl: './client-pages.component.html',
  styleUrl: './client-pages.component.css'
})
export class ClientPagesComponent {
  userInfo: UserModel = {} as UserModel;
  userId: string | null = null;
  IsLogin: boolean = false;
  // Project: ProjectModel = {} as ProjectModel;
  // constructor(private dialog: MatDialog, private AuthService: AuthService, private RoleService: RoleService, private Route: Router
  //   , private userManagmentService: UserManagmentService, private projectService: ProjectService
  // ) {
  //   this.AuthService.userId$.subscribe({
  //     next: (data) => {
  //       if (data != null && data != undefined) {
  //         this.userId = data;
  //         this.GetClientData(this.userId);

  //       }
  //     }
  //   })

  // }
  // Client: ClientModel = {} as ClientModel;
  // GetClientData(userId: string) {
  //   if (this.userId != null) {
  //     this.userManagmentService.GetClient(userId).subscribe({
  //       next: (data) => {
  //         this.Client = data;
  //         //console.log(this.Client)
  //         if (this.Client.projectId != 0) {
  //           this.GetProject(this.Client.projectId);
  //         }
  //       },
  //       error: (error) => {
  //         console.log(error)
  //       }
  //     })
  //   }
  // }
  // ngOnInit(): void {
  //   this.AuthService.userId$.subscribe({
  //     next: (userID) => {
  //       this.userId = userID;
  //       // console.log("userId in nav ", userID)
  //       if (this.userId != null) {
  //         this.GetUserData(this.userId);
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });


  // }
  // //====================================================================
  // GoTo() {
  //   if (this.IsLogin == true) {
  //     if (this.userInfo.job[0] == 'عميل') {
  //       this.Route.navigateByUrl("/clientPage/mainPage");

  //     }
  //     else {
  //       this.Route.navigateByUrl("/userPage/controlPanel");
  //     }
  //   }
  //   else {
  //     this.Route.navigateByUrl("login");
  //   }
  // }
  // //====================================================================
  // GetUserData(userId: string) {
  //   this.userManagmentService.GetUser(userId).subscribe({
  //     next: (data) => {
  //       this.userInfo = data;
  //       if (this.userInfo.confirm) {
  //         this.IsLogin = true;
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  // //====================================================================
  // GetProject(projectId: number) {
  //   this.projectService.GetProjectById(projectId).subscribe({
  //     next: (data) => {
  //       this.Project = data;

  //       //console.log(this.Project)
  //     }
  //   })
  // }
  // //====================================================================
  // Logout() {
  //   this.IsLogin = false;
  //   this.RoleService.RemovePermissions();
  //   this.AuthService.Logout();
  // }
  ///////////////////////////////////////////////////////////


}
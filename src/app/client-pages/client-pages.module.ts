import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPagesRoutingModule } from './client-pages-routing.module';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientPagesRoutingModule,
    RouterLink,
    RouterModule,
  ]
})
export class ClientPagesModule { }

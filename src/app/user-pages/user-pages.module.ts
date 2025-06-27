import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPagesRoutingModule } from './user-pages-routing.module';
 import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  declarations: [],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
     ReactiveFormsModule ,
    NgSelectModule,
    MatNativeDateModule
  ]
})
export class UserPagesModule { }
// npm install ng2-pdf-viewer
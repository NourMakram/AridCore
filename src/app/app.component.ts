import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
  import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationError } from '@angular/router';
 import { Observable } from 'rxjs/internal/Observable';


import { of } from 'rxjs'; 
import { delay } from 'rxjs/operators'; 
import { AuthService } from './Services/auth.service';
import { NavbarComponent } from './client-pages/navbar/navbar.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = "Etisaq";
   currentUrl:string="";
  constructor(private router: Router, private authService:AuthService) {

     
    }


  }
  

  
  
  
  



import { Component, Inject } from '@angular/core';
import { UserBadge } from '../../../Models/UserBadge';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { count } from 'rxjs';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-badges-dialog',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-badges-dialog.component.html',
  styleUrl: './user-badges-dialog.component.css'
})
export class UserBadgesDialogComponent {
 userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private userBadgeService: UserBadgeService, 
    public dialogRef: MatDialogRef<UserBadgesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { userId: string }

  ) {
    
    if(this.Data.userId!=undefined){
      this.GetUserBadges(this.Data.userId);
    }
  }
  
  //===================================================================================================
  UserBadges : UserBadge [] =[];
  GetUserBadges(userId: string) {
    this.userBadgeService.GetUserBadge(userId).subscribe({
      next: (value) => {
        console.log(value)
         this.UserBadges = value;
       }
    })
  }

  //===================================================================================================
   
 
  Close(){
   this.dialogRef.close();
  }
}

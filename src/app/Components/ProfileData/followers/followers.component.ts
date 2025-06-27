import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../../Services/token-service.service';
import { FollowService } from '../../../Services/follow.service';
import { Follower } from '../../../Models/Follower';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent {
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private FollowService: FollowService, public dialogRef: MatDialogRef<FollowersComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { userId: string, type: number }

  ) {
    if (this.Data.type == 1 && this.Data.userId !=undefined) {
      this.followers(this.Data.userId, this.count);
    }
    else if (this.Data.type == 2 && this.Data.userId!=undefined ) {
      this.Following(this.Data.userId, this.count);
    }
  }
  //===================================================================================================
  count: number = 10;
  Users: Follower[] = [];
  total:number = 0;
  followers(userId: string, count: number) {
    this.FollowService.GetFollower(userId, count).subscribe({
      next: (value) => {
                console.log(value.data)

        this.Users = value.data;
                this.total = value.totalCount;

      }
    })
  }
  //===================================================================================================
  Following(userId: string, count: number) {
    this.FollowService.GetFollowed(userId, count).subscribe({
      next: (value) => {
       console.log(value.data)

        this.Users = value.data;
        this.total = value.totalCount;
      }
    })
  }

  //===================================================================================================
  GetMore() {
    this.count += this.count;
    if (this.Data.type == 1) {
      this.followers(this.Data.userId, this.count);
    }
    else if (this.Data.type == 2) {
      this.Following(this.Data.userId, this.count);
    }
  }
//===================================================================================================
  Close(){
   this.dialogRef.close();
  }
}

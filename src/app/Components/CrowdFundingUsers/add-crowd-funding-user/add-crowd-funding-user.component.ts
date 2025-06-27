import { Component, Inject } from '@angular/core';
import { CrowdFundingUsersService } from '../../../Services/crowd-funding-users.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { UserInfo } from '../../../Models/UserModel';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-crowd-funding-user',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, CommonModule, RouterLink, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './add-crowd-funding-user.component.html',
  styleUrl: './add-crowd-funding-user.component.css'
})
export class AddCrowdFundingUserComponent {
  CrowdFundingUserForm: FormGroup;
  userId: any;
  RoleName: any;
  userControl = new FormControl<string | UserInfo>('');
  filteredUsers: UserInfo[] = [];
  loading = false;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private crowdFundingUsersService: CrowdFundingUsersService,
    private userManagmentService: UserManagmentService,
    public dialogRef: MatDialogRef<AddCrowdFundingUserComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { projectId: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.CrowdFundingUserForm = fb.group({
      crowdFundingId: [this.Data.projectId, Validators.required],
      applicationUserId: ['', Validators.required],
    });
    // this.GetUsers();
  }

  FilterUsers(e: any) {
    let SearchName = e.target.value;
    this.userManagmentService.GetUsersList(1, 40, SearchName).subscribe({
      next: (value) => {
        this.filteredUsers = value.data;
      }
    });
  }
  //===================================================================================================
  displayUser(user: any): string {
    return user ? user.name : '';
  }
  //===================================================================================================
  onUserSelected(event: any) {
    console.log("selected", event)
    const selectedUser: UserInfo = event.option.value;
    this.CrowdFundingUserForm.patchValue({ applicationUserId: selectedUser.id });
  }
  //====================================================================================================
  Submit() {
    if (this.CrowdFundingUserForm.valid) {
      this.crowdFundingUsersService.Create(this.CrowdFundingUserForm?.value)
        .subscribe({
          next: (value) => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.dialogRef.close(false);
          }
        })
    }
    else {
      Object.keys(this.CrowdFundingUserForm.controls).forEach(field => {
        const control = this.CrowdFundingUserForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //================================================================================================

  GoBack() {

    if (this.RoleName != null) {

      if (this.RoleName == "Member") {

        this.Router.navigateByUrl("clientPage/CrowdFunding");

      }
      else if (this.RoleName == "Admin") {

        this.Router.navigateByUrl("userPage/CrowdFunding");

      }
    }
  }





}

import { Component, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { UserInfo } from '../../../Models/UserModel';
 import { TokenServiceService } from '../../../Services/token-service.service';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { StatementService } from '../../../Services/statement.service';
import { Router, RouterLink } from '@angular/router';
import { min } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-statement',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,MatFormFieldModule,
      MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './add-statement.component.html',
  styleUrl: './add-statement.component.css'
})
export class AddStatementComponent {
 userControl = new FormControl<string | UserInfo>('');
  filteredUsers: UserInfo[] = [];
  loading = false;
  statementForm:FormGroup ;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private statementService: StatementService,
    private userManagmentService: UserManagmentService,
    public dialogRef: MatDialogRef<AddStatementComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: {}

  ) {
    this.statementForm = fb.group({
      applicationUserId: ['', Validators.required],
      destination: [false, Validators.required],
      amount:['',[Validators.required,Validators.min(1)]],
      balanceType:[2,Validators.required],
      details:['',Validators.required]
    });
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
    this.statementForm.patchValue({ applicationUserId: selectedUser.id });
  }
  //====================================================================================================
  Submit() {
    if (this.statementForm.valid) {
      this.statementService.Create(this.statementForm?.value)
        .subscribe({
          next: (value) => {
            // console.log("Close Success");
            this.dialogRef.close(true);
          },
          error: (error) => {
            // console.log(error);
            this.dialogRef.close(false);
          }
        })
    }
    else {
      Object.keys(this.statementForm.controls).forEach(field => {
        const control = this.statementForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //================================================================================================

   
}

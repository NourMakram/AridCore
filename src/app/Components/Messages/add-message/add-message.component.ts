import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { UserInfo, userModel2 } from '../../../Models/UserModel';
import { MessageService } from '../../../Services/message.service';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule,MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.css'
})
export class AddMessageComponent {
  MessageForm:FormGroup;
  userId:any;
  RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder,
private userManagmentService:UserManagmentService,private MessageService:MessageService,
public dialogRef: MatDialogRef<AddMessageComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.MessageForm = fb.group({
    fromUserId :[this.userId,Validators.required],
    toUserId  :['',Validators.required],
    subject :['',Validators.required],
    message :['',Validators.required],
   });

  
}

//====================================================================================================
 Submit() {
    if (this.MessageForm?.valid) {
      let Data = this.ConvertToFromData();
      this.MessageService.Create(Data)
      .subscribe({
        next:(value)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
          this.dialogRef.close(false);
        }
      })
    //  this.dialogRef.close(this.CrowdFundingContributionTypeForm?.value);
    }
    else {
      Object.keys(this.MessageForm.controls).forEach(field => {
        const control = this.MessageForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

//======================================================================================
ConvertToFromData(){
  let formData = new FormData();
  formData.append('message',this.MessageForm.get('message')?.value);
  formData.append('subject',this.MessageForm.get('subject')?.value);
  formData.append('fromUserId',this.MessageForm.get('fromUserId')?.value);
  formData.append('toUserId',this.MessageForm.get('toUserId')?.value);
 if (this.FileUrl) {
      formData.append('formFile', this.FileUrl);

    }
    return formData;
}


//======================================================================================
 FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
//======================================================================================

 onNoClick(): void {
      this.dialogRef.close();
    }
//======================================================================================
  userControl = new FormControl<string | UserInfo>('');
  filteredUsers: UserInfo[] = [];
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
        this.MessageForm.patchValue({ toUserId: selectedUser.id });
      }
}

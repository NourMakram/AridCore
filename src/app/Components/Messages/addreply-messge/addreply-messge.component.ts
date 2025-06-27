import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AddMessageComponent } from '../add-message/add-message.component';
import { MessageService } from '../../../Services/message.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addreply-messge',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './addreply-messge.component.html',
  styleUrl: './addreply-messge.component.css'
})
export class AddreplyMessgeComponent {
  MessageForm:FormGroup;
  userId:any;
  RoleName:any;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder,
private MessageService:MessageService,
public dialogRef: MatDialogRef<AddMessageComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {MessageId:number}
 
   ) {
   
  this.userId = this.TokenService.GetUserId();
  this.RoleName = this.TokenService.GetRole();

 this.MessageForm = fb.group({
    messageId  :[this.Data.MessageId,Validators.required],
    userId :[this.userId,Validators.required],
    message :['',Validators.required],
   });

  
}

//====================================================================================================
 Submit() {
    if (this.MessageForm?.valid) {
      let Data = this.ConvertToFromData();
      this.MessageService.MessageReply(Data)
      .subscribe({
        next:(value)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
          this.dialogRef.close(false);
        }
      })
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
  formData.append('messageId',this.MessageForm.get('messageId')?.value);
  formData.append('message',this.MessageForm.get('message')?.value);
  formData.append('userId',this.MessageForm.get('userId')?.value);
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
 
}

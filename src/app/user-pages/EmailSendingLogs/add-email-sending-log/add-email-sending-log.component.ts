import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CertificateTemplate } from '../../../Models/CertificateTemplate';
import { EmailContent } from '../../../Models/EmailContent';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { EmailSendingLogsService } from '../../../Services/email-sending-logs.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-email-sending-log',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-email-sending-log.component.html',
  styleUrl: './add-email-sending-log.component.css'
})
export class AddEmailSendingLogComponent {
  EmailSendingLogForm:FormGroup;
  constructor(private fb:FormBuilder,private EmailContentService:EmailContentsService ,
    private Router:Router,private emailSendingLogService:EmailSendingLogsService
    ){
    this.EmailSendingLogForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      emailContentId: ['',Validators.required]
    });
     
      this.GeEmailContents();
     }
    
    ///===============================================================================================
    EmailContents:EmailContent[]=[];
    GeEmailContents(){
    this.EmailContentService.GetAllList().subscribe({
      next:(value)=>{
        this.EmailContents = value;
      }
    })
    }
    
    ///===============================================================================================
    Submit(){
      if (this.EmailSendingLogForm.valid) {
           this.emailSendingLogService.Create(this.EmailSendingLogForm?.value).subscribe({
             next: () => {
               console.log("Success To Add");
               this.Router.navigateByUrl("userPage/EmailSendingLogs");
             },
             error: (error) => {
               console.log(error);
             }
           })
         }
         else {
           Object.keys(this.EmailSendingLogForm.controls).forEach(field => {
             const control = this.EmailSendingLogForm.controls[field];
             control.markAsTouched({ onlySelf: true });
           });
         }
     
    }
    
     
     
}

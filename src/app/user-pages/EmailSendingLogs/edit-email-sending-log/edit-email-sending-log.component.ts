import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailContent } from '../../../Models/EmailContent';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { EmailSendingLogsService } from '../../../Services/email-sending-logs.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-email-sending-log',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-email-sending-log.component.html',
  styleUrl: './edit-email-sending-log.component.css'
})
export class EditEmailSendingLogComponent {
 EmailSendingLogForm:FormGroup;
 id:any;
  constructor(private fb:FormBuilder,private EmailContentService:EmailContentsService ,
    private Router:Router,private emailSendingLogService:EmailSendingLogsService,
    private activeRouter:ActivatedRoute
    ){
    this.EmailSendingLogForm = this.fb.group({
      id:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      emailContentId: ['',Validators.required]
    });
     
      this.GeEmailContents();

      this.activeRouter.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id != 0) {
          this.Get(this.id);
        }
    
      });
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
           this.emailSendingLogService.Edit(this.EmailSendingLogForm?.value).subscribe({
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
    
//==============================================================================
Get(id:number){
  this.emailSendingLogService.Get(id).subscribe({
    next:(value)=>{
      this.EmailSendingLogForm.patchValue({
       id:value.id,
       email:value.email,
       emailContentId:value.emailContentId
      })
    }
  })
}
}

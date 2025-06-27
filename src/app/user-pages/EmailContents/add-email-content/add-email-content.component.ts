import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendersService } from '../../../Services/senders.service';
import { Sender } from '../../../Models/Sender';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-email-content',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './add-email-content.component.html',
  styleUrl: './add-email-content.component.css'
})
export class AddEmailContentComponent {
EmailContentForm:FormGroup;
constructor(private fb:FormBuilder,private senderService:SendersService,
  private EmailContentService:EmailContentsService,private Router:Router
){
  this.EmailContentForm=this.fb.group({ 
    // id: [''],
    arContent: ['',Validators.required],
    arSubject: ['',Validators.required],
    senderId: ['',Validators.required],
  });
  this.GetSenders();
}
//========================================================================
Senders:Sender[]=[];
GetSenders(){
this.senderService.GetAll().subscribe({
  next:(value) =>{
    this.Senders=value;
  },
})
}
//========================================================================
Submit() {
  if (this.EmailContentForm.valid) {
    console.log(this.EmailContentForm.value)
    this.EmailContentService.Create(this.EmailContentForm.value).subscribe({
      next: () => {
        console.log("Success To Add");
        this.Router.navigateByUrl("/userPage/EmailContents");
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  else {
    Object.keys(this.EmailContentForm.controls).forEach(field => {
      const control = this.EmailContentForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
}

}

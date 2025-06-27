import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Sender } from '../../../Models/Sender';
import { EmailContentsService } from '../../../Services/email-contents.service';
import { SendersService } from '../../../Services/senders.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-email-content',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit-email-content.component.html',
  styleUrl: './edit-email-content.component.css'
})
export class EditEmailContentComponent {
EmailContentForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private senderService:SendersService,
  private EmailContentService:EmailContentsService,private Router:Router,
  private activeRouter:ActivatedRoute
){
  this.EmailContentForm=this.fb.group({
    
      id: [''],
      arContent: ['',Validators.required],
      arSubject: ['',Validators.required],
      senderId: ['',Validators.required],
    
  });
  this.GetSenders();

  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);
    }

  });

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
    this.EmailContentService.Edit(this.EmailContentForm.value).subscribe({
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
//=====================================================================================
Get(id:number){
  this.EmailContentService.Get(id).subscribe({
    next:(value)=>{
      // console.log(value)
      this.EmailContentForm.patchValue({
        id:value.id,
        arSubject:value.arSubject,
        arContent:value.arContent,
        senderId:value.senderId
      });
    }
  })
}
}

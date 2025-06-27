import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SendersService } from '../../../Services/senders.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-senders',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-senders.component.html',
  styleUrl: './edit-senders.component.css'
})
export class EditSendersComponent {
SenderForm:FormGroup;
id:any;
constructor(private fb:FormBuilder,private Router:Router,private SenderService:SendersService,
  private activeRouter:ActivatedRoute
){
  this.SenderForm = this.fb.group({
    id:['',Validators.required],
    email:['',Validators.required],
    arDescription: ['',Validators.required],
    enDescription: ['',Validators.required]
  });

  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);

    }

  });
}

Submit() {
  if (this.SenderForm.valid) {
    console.log(this.SenderForm.value)
    this.SenderService.Edit(this.SenderForm.value).subscribe({
      next: () => {
        console.log("Success To Add");
        this.Router.navigateByUrl("/userPage/Senders");
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  else {
    Object.keys(this.SenderForm.controls).forEach(field => {
      const control = this.SenderForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
}
//================================================================================
Get(id:number){
  this.SenderService.Get(id).subscribe({
    next:(value)=>{
      this.SenderForm.patchValue({
        id:value.id,
        email:value.email,
        arDescription:value.arDescription,
        enDescription:value.enDescription
      })
    }
  })
}
}

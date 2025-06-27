import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SendersService } from '../../../Services/senders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-senders',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-senders.component.html',
  styleUrl: './add-senders.component.css'
})
export class AddSendersComponent {
SenderForm:FormGroup;
constructor(private fb:FormBuilder,private Router:Router,private SenderService:SendersService){
  this.SenderForm = this.fb.group({
    email:['',Validators.required],
    arDescription: ['',Validators.required],
    enDescription: ['',Validators.required]
  });
}

Submit() {
  if (this.SenderForm.valid) {
    console.log(this.SenderForm.value)
    this.SenderService.Create(this.SenderForm.value).subscribe({
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



}

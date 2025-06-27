import { Component } from '@angular/core';
import { Sender } from '../../../Models/Sender';
import { SendersService } from '../../../Services/senders.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-senders',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './senders.component.html',
  styleUrl: './senders.component.css'
})
export class SendersComponent {
Senders:Sender[]=[];
constructor(private sendersService:SendersService){
  this.getAll();
}
getAll(){
  this.sendersService.GetAll().subscribe({
    next:(value)=>{
      this.Senders=value;
    }
  })
}
//=============================================================================================
Delete(id: number) {
  this.sendersService.Delete(id).subscribe({
    next: () => {
      this.getAll();
    },
    error: (error) => {
      console.log(error)
    }
  })
}
}

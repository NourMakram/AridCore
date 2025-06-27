import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UserBadgeService } from '../../../Services/user-badge.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-innovative-idea',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './add-innovative-idea.component.html',
  styleUrl: './add-innovative-idea.component.css'
})
export class AddInnovativeIdeaComponent {
  InnovativeIdeaForm:FormGroup;
  id:any;
  userId:any;
  constructor(private fb:FormBuilder,
  private TokenService:TokenServiceService,
  private userBadgeService:UserBadgeService,
  public dialogRef: MatDialogRef<AddInnovativeIdeaComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { id: number }){
    this.userId = this.TokenService.GetUserId();
     

    this.InnovativeIdeaForm = this.fb.group({
      userId:[this.userId,Validators.required],
      badgeId:[this.Data.id,Validators.required],
      details: ['',[Validators.required,Validators.maxLength(250)]],
   
    });
    
   
  }

  Submit(){
    if (this.InnovativeIdeaForm.valid) {
      this.userBadgeService.AddInvoation(this.InnovativeIdeaForm?.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
         this.dialogRef.close(false);

        }
      })
    }
    else {
      Object.keys(this.InnovativeIdeaForm.controls).forEach(field => {
        const control = this.InnovativeIdeaForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

  onNoClick(): void {
      this.dialogRef.close();
    }
   
   
}

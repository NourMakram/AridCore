import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../Services/role.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  roleForm!: FormGroup;
   fileUrl: File | null = null;
   
  constructor(private fb: FormBuilder, private Router: Router,
    public dialogRef: MatDialogRef<AddRoleComponent>,
     @Inject(MAT_DIALOG_DATA) public Data: {id:string},
    private roleService: RoleService) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      roleId:['']
    });
  }
  //==============================================================================
  Submit() {
    if (this.roleForm.valid) {
      this.roleService.Create(this.roleForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true)
          console.log("Success To Add");
          this.Router.navigateByUrl("/userPage/Roles");
        },
        error: (error) => {
          this.dialogRef.close(false)
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.roleForm.controls).forEach(field => {
        const control = this.roleForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

  onNoClick(): void {
      this.dialogRef.close();
    }
}

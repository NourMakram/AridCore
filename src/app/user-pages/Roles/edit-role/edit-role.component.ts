import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../Services/role.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Role } from '../../../Models/Role';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-role',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {
  roleForm!: FormGroup;
  id: any;
  constructor(private fb: FormBuilder, private Router: Router, private activeRouter: ActivatedRoute,
    private roleService: RoleService,public dialogRef: MatDialogRef<EditRoleComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:string}) {

    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      roleId: [this.id]
    });



    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.get(this.id);

    });
  }
  //==============================================================================
  Submit() {
    if (this.roleForm.valid) {
      this.roleService.Edit(this.roleForm.value).subscribe({
        next: () => {
         this.dialogRef.close(true);
        },
        error: (error) => {
          this.dialogRef.close(false);
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
  //==============================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
  //==============================================================================
  role: Role = {} as Role;
  get(id: string) {
    this.roleService.Get(id).subscribe({
      next: (value) => {
        this.role = value;
        this.roleForm.patchValue({
          role: this.role.name,
          roleId:this.id
        })
       },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

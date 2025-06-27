import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../../Models/Role';
import { CountryService } from '../../../Services/country.service';
import { RoleService } from '../../../Services/role.service';
import { UserManagmentService } from '../../../Services/user-managment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone:true,
  imports:[CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
AddUserForm:FormGroup;
id:any ;
constructor(private fb:FormBuilder,private countryService:CountryService,
  private RoleService:RoleService,private UserManagmentService:UserManagmentService,
  private activeRouter:ActivatedRoute,private Router:Router){
this.AddUserForm = this.fb.group({
  id:[],
  arName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
  enName:  ['', [
    Validators.required,
    Validators.pattern(/^[A-Za-z\s]+$/) // يتحقق من أن الإدخال باللغة الإنجليزية فقط
  ]],
  email: ['',[Validators.required,Validators.email]],
  password: ['',Validators.min(6)],
  countryId:  ['',Validators.required],
  roleName: ['',Validators.required]
});

this.activeRouter.paramMap.subscribe(params => {
  this.id = params.get('id');
  this.GetUser(this.id);

});
this.GetCountries();
this.GetRoles();
}
//=============================================================================================
Countries: any[] = [];
GetCountries() {
  this.countryService.GetCountries().subscribe({
    next: (value) => {
      this.Countries = value;
    },
    error: (error) => {
      console.log(error)
    }
  });
}
 //=============================================================================================
  Roles:Role[]=[];
  GetRoles(){
    this.RoleService.GetRoles().subscribe({
      next:(value)=>{
        this.Roles = value;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  //==============================================================================================
  ErrorMessage:string|null=null;
  Submit(){
    if (this.AddUserForm.valid) {
       this.UserManagmentService.Edit(this.AddUserForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
          let Message = "تم تعديل البيانات بنجاح";
        this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/userPage/users");
        },
        error: (error) => {
          console.log(error);
        let Message = "فشل تعديل البيانات حاول مرة اخري";

          if(error.error=="Email is Exists try another Email"){
            this.ErrorMessage = "البريد الألكترونى موجود  بالفعل قم بتسجيل الدخول"
            Message = "البريد الألكترونى موجود  بالفعل قم بتسجيل الدخول";

            console.log("Email is Exists try another Email")
          }
           this.NotificationMessage(Message, "error");

        }
      })
    }
    else {
      Object.keys(this.AddUserForm.controls).forEach(field => {
        const control = this.AddUserForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  //==========================================================================================
 GetUser(id:string){
  this.UserManagmentService.Get(id).subscribe({
    next:(value)=>{
      this.AddUserForm.patchValue({
        id:value.id,
        arName :value.arName,
        enName : value.enName,
        countryId :value.countryId,
        email :value.email,
        roleName :value.roleName
      });
    }
  })
 }
 //==========================================================================================
 swalWithBootstrapButtons: any = Swal.mixin({
    customClass: {
      confirmButton: "btn text-white px-3 mx-2",
      cancelButton: "btn text-white px-3 mx-2"
    },
    buttonsStyling: true
  });
  NotificationMessage(title: string, icon: string) {
    this.swalWithBootstrapButtons.fire({
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 3000

    });
  }
}

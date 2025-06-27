import { Component } from '@angular/core';
import { ProjectService } from '../../../Services/project.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CountryService } from '../../../Services/country.service';
import { Router, RouterLink } from '@angular/router';
import { GenaricModel } from '../../../Models/GenaricModel';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproject',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent {
 ProjectForm: FormGroup;
  userId:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private projectService:ProjectService,
    private TokenService:TokenServiceService,
    private CountryService:CountryService
  ){
       this.userId = this.TokenService.GetUserId();
    this.ProjectForm = this.fb.group({
      applicationUserId:[this.userId],
      projectState:['',Validators.required],
      arProjectName:['',[
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(100)
      ]],
      enProjectName:['',[
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(100)
            ]],
       fromYear:['',Validators.required],
      toYear:['',Validators.required],
      countryId:['',Validators.required],
       arDescription: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
      enDescription: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
      arDetails: ['', [
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
      enDetails: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6),
        Validators.maxLength(200)
      ]],
     });

     this.GetCountries();
     this.GetProjectStuats();
     
    }
  //==============================================================================
  Submit() {
    if (this.ProjectForm.valid) {
      // let Data = this.ConvertData();
      this.projectService.Create(this.ProjectForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
            let Message = "تم اضافة البيانات بنجاح";
                this.NotificationMessage(Message, "success");
           this.Router.navigateByUrl("/Pages/Project");
        },
        error: (error) => {
            let Message = "فشل اضافة البيانات حاول مرة اخري";
                this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.ProjectForm.controls).forEach(field => {
        const control = this.ProjectForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //=============================================================================
  Countries: any[] = [];
  GetCountries() {
    this.CountryService.GetCountries().subscribe({
      next: (value) => {
        this.Countries = value;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
 //=============================================================================
 ProjectStuats:GenaricModel[]=[];
 GetProjectStuats(){
  this.projectService.GetProjectStuats().subscribe({
    next:(value)=>{
      this.ProjectStuats = value;
    }
  })
 }
   
   //================================================================================
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

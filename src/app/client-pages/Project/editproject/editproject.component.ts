import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { ProjectService } from '../../../Services/project.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { CountryService } from '../../../Services/country.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproject',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './editproject.component.html',
  styleUrl: './editproject.component.css'
})
export class EditprojectComponent {
 ProjectForm: FormGroup;
  userId:any;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private projectService:ProjectService,
    private TokenService:TokenServiceService,
    private CountryService:CountryService,
    private activeRouter:ActivatedRoute
  ){
       this.userId = this.TokenService.GetUserId();
    this.ProjectForm = this.fb.group({
      id:[''],
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
     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);

      }

    });
    }
  //==============================================================================
  Submit() {
    if (this.ProjectForm.valid) {
      // let Data = this.ConvertData();
      this.projectService.Edit(this.ProjectForm.value).subscribe({
        next: () => {
          console.log("Success To Add");
            let Message = "تم تعديل البيانات بنجاح";
                this.NotificationMessage(Message, "success");
           this.Router.navigateByUrl("/Pages/Project");
        },
        error: (error) => {
            let Message = "فشل تعديل البيانات حاول مرة اخري";
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
 //==================================================================================
 Get(id:number){
  this.projectService.Get(id).subscribe({
    next:(value)=>{
      this.ProjectForm.patchValue({
        id:value.id,
        enDetails:value.enDetails,
        arDetails:value.arDetails,
        enDescription:value.enDescription,
        arDescription:value.arDescription,
        countryId:value.countryId,
        toYear:value.toYear,
        fromYear:value.fromYear,
        enProjectName:value.enProjectName,
        arProjectName:value.arProjectName,
        projectState:value.projectState
      })
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

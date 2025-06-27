import { NotExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeachingExperienceService } from '../../../Services/teaching-experience.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teaching-experience',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './edit-teaching-experience.component.html',
  styleUrl: './edit-teaching-experience.component.css'
})
export class EditTeachingExperienceComponent {
 TeachingExperienceForm: FormGroup;
  userId:any;
  id:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private teachingExperienceService:TeachingExperienceService,
    private TokenService:TokenServiceService,private activeRouter:ActivatedRoute) {
      this.userId = this.TokenService.GetUserId();
    this.TeachingExperienceForm = this.fb.group({
      applicationUserId:[this.userId],
      id:[''],
       arTitle:['',[
        Validators.required,
        Validators.pattern(/^[\u0600-\u06FF\s]+$/),
        Validators.minLength(6)
            ]],
      enTitle:['',[
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.minLength(6)
                  ]],
       fromYear:['',Validators.required],
      toYear:['',Validators.required],
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
      isCurrent:[false],
      indx:[10]
     });

     this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);
      }
  
    });
   }
  //==============================================================================
  Submit() {
    if (this.TeachingExperienceForm.valid) {
      // let Data = this.ConvertData();
      this.teachingExperienceService.Edit(this.TeachingExperienceForm.value).subscribe({
        next: () => {
           let Message = "تم تعديل البيانات بنجاح";
        this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/clientPage/TeachingExperience");
        },
        error: (error) => {
          let Message = "فشل تعديل البيانات حاول مرة اخري";
        this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })
    }
    else {
      Object.keys(this.TeachingExperienceForm.controls).forEach(field => {
        const control = this.TeachingExperienceForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==============================================================================
  Get(id:number) {
    this.teachingExperienceService.Get(id).subscribe({
      next:(value)=>{
        this.TeachingExperienceForm.patchValue({
          id:value.id,
          arTitle:value.arTitle,
          enTitle:value.enTitle,
          toYear:value.toYear,
          fromYear:value.fromYear,
          arDescription:value.arDescription,
          enDescription:value.enDescription
        })
      }
    })
  }

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

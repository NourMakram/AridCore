import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { TeachingExperienceService } from '../../../Services/teaching-experience.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-add-teaching-experience',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './add-teaching-experience.component.html',
  styleUrl: './add-teaching-experience.component.css'
})
export class AddTeachingExperienceComponent {
  TeachingExperienceForm: FormGroup;
  userId:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private teachingExperienceService:TeachingExperienceService,
    private TokenService:TokenServiceService) {
      this.userId = this.TokenService.GetUserId();
    this.TeachingExperienceForm = this.fb.group({
      applicationUserId:[this.userId],
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

     
   }
  //==============================================================================
  Submit() {
    if (this.TeachingExperienceForm.valid) {
      // let Data = this.ConvertData();
      this.teachingExperienceService.Create(this.TeachingExperienceForm.value).subscribe({
        next: () => {
           let Message = "تم اضافة البيانات بنجاح";
        this.NotificationMessage(Message, "success");
          this.Router.navigateByUrl("/clientPage/TeachingExperience");
        },
        error: (error) => {
           let Message = "فشل اضافة البيانات حاول مرة اخري";
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

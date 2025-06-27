import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { CityService } from '../../../Services/city.service';
import { CountryService } from '../../../Services/country.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { UniversityService } from '../../../Services/university.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../../Models/UserModel';

@Component({
  selector: 'app-user-cv',
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  standalone:true,
  templateUrl: './user-cv.component.html',
  styleUrl: './user-cv.component.css'
})
export class UserCvComponent {
 UpdateForm: FormGroup;
  userId:string|null=null;
  constructor(private TokenService: TokenServiceService, private authService: AuthService,
    private fb: FormBuilder,
  ) {
     this.UpdateForm = fb.group({
      cvurl: ['',Validators.required],
      // summary: [''],
      // contactMeDetail: [''],
    });

    this.userId = this.TokenService.GetUserId();
    if(this.userId !=undefined){
      this.GetUser(this.userId);
    }
    
  }

  Submit(){
    if (this.UpdateForm.valid) {
      let Data = this.ConvertData();
      this.authService.updateCV(Data).subscribe({
        next: () => {
            let Message = "تم  تحديث البيانات  بنجاح ";
          this.NotificationMessage(Message, "success");
           if(this.userId!=null){
            this.GetUser(this.userId);
           }
           
        },
        error: (error) => {
           let Message = "حدث خطأ اثناء تحديث البيانات  حاول مرة اخري";
                       this.NotificationMessage(Message, "error");
        }
      })
    }
    else {
      Object.keys(this.UpdateForm.controls).forEach(field => {
        const control = this.UpdateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  //============================================================================================
ConvertData() {
  let formData = new FormData();
  if(this.userId!=null){
    formData.append('userId', this.userId);

  }
  if (this.FileUrl) {
    formData.append('cv',this.FileUrl);

  }
  return formData;
}
//===============================================================================
FileUrl: File | undefined = undefined;
fileName: string|undefined = undefined;
  filePreview: string = '';
  isImage: boolean = false; 
onFileChange(e: any) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.FileUrl = input.files[0];
    console.log(this.FileUrl)
  }
  const file = e.target.files[0];

    if (file) {
      this.fileName = file.name; // Save file name

      // For PDF files, show the link and use a PDF icon
      if (file.type === 'application/pdf') {
        this.isImage = false;
        this.filePreview = URL.createObjectURL(file); // Create object URL for PDF
      } else {
        this.isImage = true;
        const reader = new FileReader();

        reader.onload = () => {
          this.filePreview = reader.result as string;
        };
        reader.readAsDataURL(file); // Read the file as Data URL for image preview
      }
    }

}

//==============================================================================
  User: UserModel = {} as UserModel;
   GetUser(userId: string) {
     this.authService.GetUser(userId).subscribe({
       next: (value) => {
         this.User = value;
         this.isImage =false;
         this.fileName = this.User.cvurl.split('/').pop();
         this.filePreview = this.User.cvurl;
       }
       ,
       error: (error) => {
         console.log(error)
       }
     })
   }
//=======================================================
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

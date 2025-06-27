import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileLinkService } from '../../../Services/profile-link.service';
import { GenaricModel } from '../../../Models/GenaricModel';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-profile-links',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-profile-links.component.html',
  styleUrl: './add-profile-links.component.css'
})
export class AddProfileLinksComponent {
ProfileLinkForm:FormGroup;
userId:any;
  constructor(private fb: FormBuilder, private Router: Router,
    private profileLinkService:ProfileLinkService,
    private TokenService:TokenServiceService,public dialogRef: MatDialogRef<AddProfileLinksComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {}){
this.userId = this.TokenService.GetUserId();
this.ProfileLinkForm = this.fb.group({
  id:[0],
  applicationUserId:[this.userId,Validators.required],
  profileType:['',Validators.required],
  profileUrl:['',Validators.required],
  accessType:['',Validators.required],
});

this.GetProfileTypes();

}
 //==============================================================================
//  Submit() {
//   if (this.ProfileLinkForm.valid) {
//     // let Data = this.ConvertData();
//     this.profileLinkService.Create(this.ProfileLinkForm.value).subscribe({
//       next: () => {
//         console.log("Success To Add");
//         this.Router.navigateByUrl("/clientPage/ProfileLink");
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     })
//   }
//   else {
//     Object.keys(this.ProfileLinkForm.controls).forEach(field => {
//       const control = this.ProfileLinkForm.controls[field];
//       control.markAsTouched({ onlySelf: true });
//     });
//   }

// }
//====================================================================================================
 Submit() {
    if (this.ProfileLinkForm.valid) {
      this.profileLinkService.Create(this.ProfileLinkForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);

      },
      error: (error) => {
     this.dialogRef.close(false);
      }
    })
    }
    else {
      Object.keys(this.ProfileLinkForm.controls).forEach(field => {
        const control = this.ProfileLinkForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
   
   
//===============================================================================================
ProfileTypes:GenaricModel[]=[];
GetProfileTypes(){
  this.profileLinkService.GetProfileTypes().subscribe({
    next:(value)=>{
      this.ProfileTypes = value;
    }
  })
}

}

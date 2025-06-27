import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenaricModel } from '../../../Models/GenaricModel';
import { ProfileLinkService } from '../../../Services/profile-link.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-links',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-profile-links.component.html',
  styleUrl: './edit-profile-links.component.css'
})
export class EditProfileLinksComponent {
ProfileLinkForm:FormGroup;
userId:any;
 constructor(private fb: FormBuilder, private Router: Router,
     private profileLinkService:ProfileLinkService,
     private TokenService:TokenServiceService,public dialogRef: MatDialogRef<EditProfileLinksComponent>,
  @Inject(MAT_DIALOG_DATA) public Data: {id:number}){
this.userId = this.TokenService.GetUserId();
this.ProfileLinkForm = this.fb.group({
  id:[this.Data.id],
  applicationUserId:[this.userId,Validators.required],
  profileType:['',Validators.required],
  profileUrl:['',Validators.required],
  accessType:['',Validators.required],
});

this.GetProfileTypes();

  if (this.Data.id != 0) {
    this.Get(this.Data.id);

  }


}
//==================================================================================================
  onNoClick(): void {
      this.dialogRef.close();
    }
 //==============================================================================
 Submit() {
  if (this.ProfileLinkForm.valid) {
    // let Data = this.ConvertData();
    this.profileLinkService.Edit(this.ProfileLinkForm?.value).subscribe({
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
//===============================================================================================
ProfileTypes:GenaricModel[]=[];
GetProfileTypes(){
  this.profileLinkService.GetProfileTypes().subscribe({
    next:(value)=>{
      this.ProfileTypes = value;
    }
  })
}
//===============================================================================================
Get(id:number){
  this.profileLinkService.Get(id).subscribe({
    next:(value)=>{
      this.ProfileLinkForm.patchValue({
        id:value.id,
        accessType:value.accessType,
        profileUrl:value.profileUrl,
        profileType:value.profileType
      })
    }
  })
}
}

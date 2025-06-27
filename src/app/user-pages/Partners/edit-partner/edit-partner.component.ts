import de from '@angular/common/locales/de';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { PartnerService } from '../../../Services/partner.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-partner',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-partner.component.html',
  styleUrl: './edit-partner.component.css'
})
export class EditPartnerComponent {
PartnerForm: FormGroup;
  userId: string | null = null;
  RoleName:string | null = null;
  id:any;
  constructor(private fb: FormBuilder, private partnerService:PartnerService,
    private tokenServiceService: TokenServiceService, private authService: AuthService,
    private Router: Router,private activeRouter:ActivatedRoute
  ) {
     this.RoleName= this.tokenServiceService.GetRole();
    this.PartnerForm = this.fb.group({
      id:['',Validators.required],
      applicationUserId: [Validators.required],
      name:['',Validators.required],
      mobile: ['',[Validators.required,Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      email: ['',[Validators.required,Validators.email]],
      details:['',Validators.required],
      isVisible: [true,Validators.required]
    });


 this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.Get(this.id);

      }

    });
  }
   

  //=========================================================================================
  CheckBalance() {
    if (this.PartnerForm.valid) {
     
        this.Submit();
      

    }
    else {
      Object.keys(this.PartnerForm.controls).forEach(field => {
        const control = this.PartnerForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
//=========================================================================================
  Submit() {
    
    this.partnerService.Edit(this.PartnerForm?.value).subscribe({
      next: () => {
        console.log("Success To Add");
        if(this.RoleName != null){
          
          this.GoBack();

        }
      },
      error: (error) => {
        console.log(error);
      }
    })


  }

  //==========================================================================================
  Get(id:number) {
       this.partnerService.Get(id).subscribe({
        next: (value) => {
             if(value != null){
              this.PartnerForm.patchValue({
                id:value.id,
                email:value.email,
                applicationUserId:value.applicationUserId,
                mobile:value.mobile,
                name:value.name,
                isVisible:value.isVisible,
                details:value.details
              })
            }
        }
      });
    


  }
  //=======================================================================================
 GoBack(){

     if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl("clientPage/Partner");

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl("userPage/Partner");

     }
     }
  }
}

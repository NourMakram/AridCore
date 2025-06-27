import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { DonateServiceService } from '../../../Services/donate-service.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-add-donate',
  standalone:true,
    imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './admin-add-donate.component.html',
  styleUrl: './admin-add-donate.component.css'
})
export class AdminAddDonateComponent {
  DonateForm: FormGroup;
  userId: string | null = null;
  constructor(private fb: FormBuilder, private donateServiceService: DonateServiceService,
    private tokenServiceService: TokenServiceService, private authService: AuthService,
    private Router: Router
  ) {
    this.userId = this.tokenServiceService.GetUserId();
    this.DonateForm = this.fb.group({
      description: [''],
      applicationUserId: [this.userId, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });



  }
  ngOnInit(): void {
    if(this.userId != null){
      this.Get();
    }
  }

  //=========================================================================================
  CheckBalance() {
    if (this.DonateForm.valid) {
     
      if (this.userData?.balance < this.DonateForm.get('amount')?.value) {

        console.log("رصيد الحالى لايكفى قم بتعبئة الرصيد اولا")

      }
      else {
        this.Submit();

      }


    }
    else {
      Object.keys(this.DonateForm.controls).forEach(field => {
        const control = this.DonateForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
//=========================================================================================
  Submit() {

    if (this.DonateForm.get('description')?.value == "") {
      this.DonateForm.patchValue({
        description: "منصة أريد"
      });
    }

    this.donateServiceService.Create(this.DonateForm?.value).subscribe({
      next: () => {
        console.log("Success To Add");
        this.Router.navigateByUrl("userPage/Donate");
      },
      error: (error) => {
        console.log(error);
      }
    })


  }

  //==========================================================================================
  userData: UserModel = {} as UserModel;
  Get() {
    if (this.userId != null && this.userId != undefined) {
      this.authService.GetUser(this.userId).subscribe({
        next: (value) => {
          this.userData = value;
        }
      });
    }


  }
}

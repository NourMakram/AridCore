import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { DonateServiceService } from '../../../Services/donate-service.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-donate',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './edit-donate.component.html',
  styleUrl: './edit-donate.component.css'
})
export class EditDonateComponent {
DonateForm: FormGroup;
  userId: string | null = null;
  id:any;
  constructor(private fb: FormBuilder, private donateServiceService: DonateServiceService,
    private tokenServiceService: TokenServiceService, private authService: AuthService,
    private Router: Router,private activeRouter:ActivatedRoute
  ) {
    this.userId = this.tokenServiceService.GetUserId();
    this.DonateForm = this.fb.group({
      id:['',Validators.required],
      description: [''],
      applicationUserId: [this.userId, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });

  this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.GetDonate(this.id);

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
  //==========================================================================================
  GetDonate(id:number){
    this.donateServiceService.Get(id).subscribe({
      next:(value)=> {
        if(value!=null){
          this.DonateForm.patchValue({
            id:value.id,
            amount:value.amount,
            description:value.description,
            applicationUserId:value.applicationUserId
          })
        }
      },
    })
  }
}

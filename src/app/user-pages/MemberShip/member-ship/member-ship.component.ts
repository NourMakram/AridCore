import { Component } from '@angular/core';
import { MemberShip } from '../../../Models/MemberShip';
import { UserModel } from '../../../Models/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { MemberShipService } from '../../../Services/member-ship.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-ship',
  imports:[RouterLink,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './member-ship.component.html',
  styleUrl: './member-ship.component.css'
})
export class MemberShipComponent {
  MemberShipForm: FormGroup;
  userId: any;
  constructor(private fb: FormBuilder, private MemberShipService: MemberShipService, private authService: AuthService,
    private TokenService: TokenServiceService
  ) {
    this.MemberShipForm = fb.group({
       membershipType: 3,
      applicationUserId: ["", Validators.required],
    });

    this.userId = this.TokenService.GetUserId();
    if (this.userId != undefined) {
      this.GetUser(this.userId);
      this.HasMemberShip(this.userId);

    }
  }
//======================================================================================================
  MemerShipData: MemberShip = {} as MemberShip;
  HasMemberShip(userId: string) {
    this.MemberShipService.HasMemberShip(userId).subscribe({
      next: (value) => {
        this.MemerShipData = value;
        console.log("Date", this.MemerShipData);
      }
    })
  }
  //======================================================================================================
  User: UserModel = {} as UserModel;
  GetUser(userId: string) {
    this.authService.GetUser(userId).subscribe({
      next: (value) => {
        this.User = value;
        console.log("Date", this.User);

      }
      ,
      error: (error) => {
        console.log(error)
      }
    })
  }
  //======================================================================================================
  Subscribe() {
    if (this.userId != undefined){
      this.MemberShipForm.patchValue({
        applicationUserId: this.userId
      });
    if (this.MemberShipForm.valid) {
      this.MemberShipService.Subscribe(this.MemberShipForm.value).subscribe({
        next: () => {
          this.HasMemberShip(this.userId);
          let Message = "تم  الأشتراك فى العضوية الأحترافية";
        this.NotificationMessage(Message, "success");
        },
        error: (error) => {
           let Message = "فشل الأشتراك فى العضوية الأحترافية";
        this.NotificationMessage(Message, "error");
          console.log(error);
        }
      })

    }
    }
     
  }
  //======================================================================================================

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

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
 import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TokenServiceService } from '../../Services/token-service.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-login-by-dal',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './login-by-dal.component.html',
  styleUrl: './login-by-dal.component.css'
})
export class LoginByDALComponent  {
DAL:any;
constructor(private auhtService:AuthService, private Router:Router,private activeRouter:ActivatedRoute,
  private TokenService:TokenServiceService
){
  
this.activeRouter.paramMap.subscribe(params => {
    this.DAL = params.get('dal');
    if (this.DAL != undefined) {
      this.Submit();

    }

  });

}

Submit(){
  if (this.DAL !=null) {
     
    this.auhtService.LoginByDAL(this.DAL).subscribe({
      next: (value) => {
        if(value!=null){
          this.TokenService.SetToken(value.token);
          this.TokenService.SetUserId(value.userId);
          this.TokenService.SetRole(value.role);
           let Message = "تم  تسجيل الدخول بنجاح ";
          this.NotificationMessage(Message, "success");
          this.RedirectTo(value.role);

        }
        
      },
      error: (error) => {
          let Message = "حدث خطأ اثناء تسجيل الدخول تأكد من رابط الدخول المباشر ";
          this.NotificationMessage(Message, "error");
      
        console.log(error);
        this.Router.navigateByUrl('not-found')
  
      }
    })
  }
  
}
//=============================================================================================
  RedirectTo(role:string){
  if(role=="Member"){

       this.Router.navigateByUrl('/clientPage');
  }
  else if(role=="Admin"){

        this.Router.navigateByUrl('/userPage');

  }
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

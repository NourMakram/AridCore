import { Component } from '@angular/core';
import { CrowdFunding } from '../../../Models/CrowdFunding';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CrowdFundingService } from '../../../Services/crowd-funding.service';
import { CommonModule } from '@angular/common';
import { TokenServiceService } from '../../../Services/token-service.service';
import { DonateCrowdFundingComponent } from '../donate-crowd-funding/donate-crowd-funding.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-crowd-funding',
  standalone: true,
  imports: [RouterLink,CommonModule,MatDialogModule],
  templateUrl: './details-crowd-funding.component.html',
  styleUrl: './details-crowd-funding.component.css'
})
export class DetailsCrowdFundingComponent {
CrowdFunding:CrowdFunding = {} as CrowdFunding ;
id:any;
RoleName:any;
constructor(private Router:Router,private TokenService:TokenServiceService,
  private activeRouter:ActivatedRoute,private CrowdFundingService:CrowdFundingService,
 public dialog: MatDialog) {
   
  this.RoleName = this.TokenService.GetRole();
  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id != 0) {
      this.Get(this.id);

    }

  });
}
//====================================================================================
Get(id:number){
  this.CrowdFundingService.Details(id).subscribe({
    next:(value)=>{
      this.CrowdFunding = value;
    }
  })
}
//====================================================================================

 GoBack(){

     if(this.RoleName != null){

      if(this.RoleName == "Member"){
          
        this.Router.navigateByUrl("clientPage/CrowdFunding");

     }
     else if(this.RoleName == "Admin"){
            
          this.Router.navigateByUrl("userPage/CrowdFunding");

     }
     }
  }
  //=========================================================================================
   openDonateDialog(id:number){
    const dialogRef = this.dialog.open(DonateCrowdFundingComponent, {
      width: '560px',
      data: { id:id }
    });
  dialogRef.afterClosed().subscribe(result => {
  if(result!= undefined){ 
        this.CrowdFundingService.Donate(result).subscribe({
           next: () => {
          let Message = "تم اضافة البيانات بنجاح";
              this.NotificationMessage(Message, "success");
              this.GoBack();
         },
        error: (error) => {
           let Message = "فشل اضافة البيانات حاول مرة اخري";
              this.NotificationMessage(Message, "error");
          console.log(error);
        }
      });
    }
  
  });
}


   //==================================================================================================
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
  //================================================================================================== 

}

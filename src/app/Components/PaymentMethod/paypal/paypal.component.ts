import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core'  ;
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
declare let paypal: any;

@Component({
  selector: 'app-paypal',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})

export class PaypalComponent implements AfterViewInit {
PayPalForm:FormGroup;
constructor (private fb:FormBuilder){

  this.PayPalForm = this.fb.group({
    amount:['',[Validators.required,Validators.min(1)]]

  }
  );

}
  ngAfterViewInit(): void {


  }

  Submit(){
    if(this.PayPalForm.valid){
     
      this.LoadPayPal(this.PayPalForm.get('amount')?.value);
      let SubmitBtn = document.getElementById("Submit");
      let input = document.getElementById("amount");
      SubmitBtn?.classList.add('d-none');
      input?.setAttribute('readonly','readonly');

       
    }
       else {
      Object.keys(this.PayPalForm.controls).forEach(field => {
        const control = this.PayPalForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    
    }
  }

LoadPayPal(amount:number){
      paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        // هنا ننشئ الطلب (Order) ونحدد المبلغ
        return actions.order.create({
          purchase_units: [{
            amount: {
            value: amount.toFixed(2) // نحولها لسلسلة نصية بصيغة رقم عشري

            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        // لما يتم الدفع بنجاح
        return actions.order.capture().then((details: any) => {
          // alert(`شكرًا لك ${details.payer.name.given_name} على إتمام الدفع بنجاح!`);
          let Message = `شكرًا لك ${details.payer.name.given_name} على إتمام الدفع بنجاح!`;
          this.NotificationMessage(Message, "success");
        
          console.log('تفاصيل الدفع:', details);
          // هنا ممكن تضيف أي كود تاني بعد نجاح الدفع مثل تخزين بيانات، إعادة توجيه، إلخ.
        });
      },
      onError: (err: any) => {
        // console.error('خطأ في الدفع:', err);
        let Message = 'عذرًا، حدث خطأ أثناء عملية الدفع.';
          this.NotificationMessage(Message, "error");
      
        // alert('عذرًا، حدث خطأ أثناء عملية الدفع.');
      }
    }).render('#paypal-button-container'); // يتم عرض زر الدفع داخل العنصر ذو id هذا
  
  
}
//===================================================================================
 
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

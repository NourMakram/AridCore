import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../Services/payment.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import Swal from 'sweetalert2';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
declare var Stripe: any;

@Component({
  selector: 'app-stripe',
  standalone:true,
  imports:[ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css'
})
export class StripeComponent implements AfterViewInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: any;
  elements: any;
  card: any;
  userId:any;
StripeForm:FormGroup;
  constructor(private http: HttpClient,private tokenService:TokenServiceService,
    private fb:FormBuilder,private PaymentService:PaymentService,private Router:Router) {
    this.userId = this.tokenService.GetUserId();
    this.StripeForm = this.fb.group({
    userId:[this.userId],
    userAmount:['',[Validators.required,Validators.min(10),Validators.max(500)]],
    stripePaymentMethodId:['']
  }
  );
  }
  ngAfterViewInit() {
    //this.stripe = Stripe('pk_live_GMi4dw70W9XKsaw7FCa0qyu500KrCKaNrM'); // مفتاح النشر من Stripe
    this.stripe = Stripe('pk_test_51RcrEPDZDwovTqs8JnIdCY89tOUEkRCDteS37IywidoXXkF7fBuNh6z0gSyWe8fnRX9VKsSCj06ndj0bSNY27w7q00715v8qVT');

    this.elements = this.stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = this.elements.create('card', { style });
    this.card.mount(this.cardElement.nativeElement);
  }

  async handleSubmit() {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      console.error('خطأ:', error.message);
    } else {
      console.log('تم:', paymentMethod);
      console.log('تم:', paymentMethod.id);

      if(paymentMethod != undefined){
      this.SendData(paymentMethod.id);

      }
      // أرسل paymentMethod.id إلى الخادم لتكملة الدفع
    }
  }

  Next(){
    if(this.StripeForm.valid){
      let button = document.getElementById('StripData');
    button?.classList.remove('d-none');
     let input = document.getElementById("amount");
       input?.setAttribute('readonly','readonly');
    
      }
         
    
    else {
      Object.keys(this.StripeForm.controls).forEach(field => {
        const control = this.StripeForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    
    }
    
  }

  //=======================================================================================
  SendData(paymentMethodId:any){

  this.StripeForm.patchValue({
    stripePaymentMethodId: paymentMethodId
  });

    this.PaymentService.stripe(this.StripeForm.value).subscribe({
  next:(value:any)=>{
    console.log(value);
    if(value.success){
       let Message = "تمت عملية الدفع بنجاح";
        this.NotificationMessage(Message, "success");
 
      this.Router.navigateByUrl(`/clientPage/Pages/Stripe/Details/${value.paymentIntentId}`);

    }
    else{
       let Message = "عذرا! لم تتم معالجة الدفع بنجاح";
        this.NotificationMessage(Message, "error");
    }

  },
  error:(error)=>{
     let Message = "عذرا! لم تتم معالجة الدفع بنجاح";
     this.NotificationMessage(Message, "error");
    console.log(error)
  }
    })
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
}
  
 

 
 
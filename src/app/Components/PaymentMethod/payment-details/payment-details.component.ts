import { Component } from '@angular/core';
import { PaymentService } from '../../../Services/payment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Stripe } from '../../../Models/Srtipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
  id: any;
  constructor(private PaymentService: PaymentService, private activeRouter: ActivatedRoute) {

    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.GetDetails(this.id);
      }

    });
  }

  //====================================================================================================
  paymentDetails: Stripe = {} as Stripe;
  GetDetails(id: string) {
    this.PaymentService.GetStripeDetails(id).subscribe({
      next: (value) => {
        this.paymentDetails = value;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }


}

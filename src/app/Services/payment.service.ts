import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';
import { Stripe } from '../Models/Srtipe';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
HttpOptions1: { headers: HttpHeaders; };
  HttpOptions2: { headers: HttpHeaders; };

  constructor(private httpClient: HttpClient, private TokenService:TokenServiceService) {
    this.HttpOptions1 = { headers: new HttpHeaders() };
    this.HttpOptions2 = { headers: new HttpHeaders() };

    this.HttpOptions1 = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.TokenService.GetToken()}`

      })


    }
    this.HttpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.TokenService.GetToken()}`

      })
    }


  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  
  TransferCredit(Data:any){ 
     return this.httpClient.post(`${environment.APIURL}/Payment/TransferCredit`, 
      JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

  stripe(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Payment/Stripe`, 
      JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

  GetStripeDetails(paymentIntentId: string):Observable<Stripe> {
    return this.httpClient.get<Stripe>(`${environment.APIURL}/Payment/PaymentDetails/${paymentIntentId}`, { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

   

   

  
}


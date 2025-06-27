import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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



  GetAllToUser(userId:string,more:number): Observable<any> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('more', more);

    return this.httpClient.get<any>(
      `${environment.APIURL}/Notifications`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  GetNotificationCount(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Notifications/Count/${userId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

   Read(id: string): Observable<any> {
    return this.httpClient.put<any>(`${environment.APIURL}/Notifications/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

   
  
}

import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
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



  GetSentMessages(userId:string,page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('userId',userId)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(
      `${environment.APIURL}/Message/SentMessages`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
GetIncomingMessages(userId:string,page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('userId',userId)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(
      `${environment.APIURL}/Message/IncomingMessages`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  GetArchiveMessages(userId:string,page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.httpClient.get<any>(
      `${environment.APIURL}/Message/Archive/${userId}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
  GetCountMessage(userId:string){
    let params = new HttpParams()
      .set('userId', userId)
    return this.httpClient.get<any>(
      `${environment.APIURL}/Message/Count`,
      { params, ...this.HttpOptions2 }

    ).pipe(
      catchError(this.handleError)
    );
  }

  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Message/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }
  Details(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Message/Details/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Message`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));
  }

  Read(id: number) {
    return this.httpClient.put(`${environment.APIURL}/Message/${id}`,null,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));

  }
GetMessageReplies(id: number): Observable<any> {
  
    return this.httpClient.get<any>(
      `${environment.APIURL}/Message/MessageReplies/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

MessageReply(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Message/MessageReply`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));
  }

  Delete(id: number) {
   
    return this.httpClient.delete<any>(`${environment.APIURL}/Message/${id}`,
      {...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));;
  }
  
  
}



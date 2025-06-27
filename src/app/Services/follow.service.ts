import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { Router } from '@angular/router';
import id from '@angular/common/locales/id';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
HttpOptions1: { headers: HttpHeaders; };
  HttpOptions2: { headers: HttpHeaders; };

  constructor(private httpClient: HttpClient, private TokenService:TokenServiceService,
    private Router:Router
  ) {
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

GetFollower(userId: string,count:number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Follow/Followers/${userId}/${count}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  GetFollowed(userId: string,count:number): Observable<any> {
      return this.httpClient.get<any>(`${environment.APIURL}/Follow/Followed/${userId}/${count}`,
        { ...this.HttpOptions2 }
      ).pipe(catchError(this.handleError));
    }

  follow(Data:any){
    return this.httpClient.post<any>(`${environment.APIURL}/Follow`,JSON.stringify(Data),
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

Delete(userId:string,followId:string){
    return this.httpClient.delete<any>(`${environment.APIURL}/Follow/Delete/${userId}/${followId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  isFirend(userId1:string,userId2:string){
 return this.httpClient.get<any>(`${environment.APIURL}/Follow/IsFollow/${userId1}/${userId2}`,
        { ...this.HttpOptions2 }
      ).pipe(catchError(this.handleError));
  }
  

}

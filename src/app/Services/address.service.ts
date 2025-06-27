import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
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


  GetAll(page: number, pageSize: number,keyword:string): Observable<any> {
    let params = new HttpParams();
       
      if(keyword){
        params.set('search',keyword);
      }
 
    return this.httpClient.get<any>(
      `${environment.APIURL}/Address/GetAll/${page}/${pageSize}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  GetByUserId(userId:string): Observable<any> {

    return this.httpClient.get<any>(
      `${environment.APIURL}/Address/GetByUser/${userId}`,
      {...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
  

  Get(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Address/Get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Address`,
       JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/Address`,
       JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  }

  Delete(id: number) {
    return this.httpClient.delete<any>(`${environment.APIURL}/Address/${id}`,
      {...this.HttpOptions2}
    ).pipe(catchError(this.handleError));;
  }

}



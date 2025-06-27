import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutAdsService {
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


  GetAll(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.APIURL}/LayoutAds/GetAll/${page}/${pageSize}`,
      { ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  GetByPostion(positionId:number): Observable<any> {

    return this.httpClient.get<any>(
      `${environment.APIURL}/LayoutAds/GetTop5ByPostion/${positionId}`,
      {...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
  

  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/LayoutAds/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/LayoutAds`,
       Data, {...this.HttpOptions1}).pipe(catchError(this.handleError));
  
  }

  Edit(id:number,Data: any) {
    return this.httpClient.put(`${environment.APIURL}/LayoutAds/${id}`,
       Data, { ...this.HttpOptions1 }).pipe(catchError(this.handleError));
  }

  Delete(id: number) {
    return this.httpClient.delete<any>(`${environment.APIURL}/LayoutAds/${id}`,
      {...this.HttpOptions2}
    ).pipe(catchError(this.handleError));;
  }

}




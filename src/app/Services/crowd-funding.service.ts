import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class CrowdFundingService {
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



  GetAll(page: number, pageSize: number, search: string,Stauts:number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    if(Stauts){
      params= params.set('Stauts',Stauts);
    }

    return this.httpClient.get<any>(
      `${environment.APIURL}/CrowdFundings/GetAllToAdmin/${page}/${pageSize}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
 
    GetAllUsers(page: number, pageSize: number, search: string,Stauts:number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    if(Stauts){
      params = params.set('Stauts',Stauts);
    }
    return this.httpClient.get<any>(
      `${environment.APIURL}/CrowdFundings/GetAllToUsers/${page}/${pageSize}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }


  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/CrowdFundings/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Details(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/CrowdFundings/Details/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/CrowdFundings`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));
  }

   Donate(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/CrowdFundings/Donate`,JSON.stringify(Data),{ ...this.HttpOptions2} ).pipe(catchError(this.handleError));
  } 

  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/CrowdFundings`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));

  }
  CrowdFundingStauts(){
     return this.httpClient.get<any>(`${environment.APIURL}/CrowdFundings/CrowdFundingStatus`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

   GetPaymentsCrowdFunding(projectId:number,page:number,pageSize:number): Observable<any> {

    return this.httpClient.get<any>(
      `${environment.APIURL}/CrowdFundings/Payments/${projectId}/${page}/${pageSize}`,
      {...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  Delete(id: number) {
    return this.httpClient.delete<any>(`${environment.APIURL}/CrowdFundings/${id}`,
      {...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));;
  }


  
   
}

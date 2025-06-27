import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class CrowdFundingContributionTypeService {
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



  GetAll(projectId:number,page: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.APIURL}/CrowdFundingContributionTypes/GetAll/${projectId}/${page}/${pageSize}`,
      {...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }


  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/CrowdFundingContributionTypes/Get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/CrowdFundingContributionTypes`,JSON.stringify(Data),{ ...this.HttpOptions2} ).pipe(catchError(this.handleError));
  }

  
  Edit(id:number,Data: any) {
    return this.httpClient.put(`${environment.APIURL}/CrowdFundingContributionTypes/${id}`,JSON.stringify(Data),{ ...this.HttpOptions2} ).pipe(catchError(this.handleError));

  }
  
  

  Delete(id: number) {
    return this.httpClient.delete<any>(`${environment.APIURL}/CrowdFundingContributionTypes/${id}`,
      {...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));;
  }
}

import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MemberShipService {
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


  GetAll(page: number, pageSize: number,search:string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
 
    return this.httpClient.get<any>(
      `${environment.APIURL}/Membership/GetAll/${page}/${pageSize}?search=${search}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  HasMemberShip(userId:string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.APIURL}/Membership/HasMamberShip/${userId}`,
     {...this.HttpOptions2},
    ).pipe(
      catchError(this.handleError)
    );
  }

  ExportMemeberShipLetter(id: string): Observable<Blob> {
    return this.httpClient.get(`${environment.APIURL}/Membership/MembershipLetterExport/${id}`, {
      responseType: 'blob',  // تحديد أن الاستجابة ستكون من نوع blob (ملف)
    });
  }
  Get(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Membership/Get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Membership`, JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

  Subscribe(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Membership/subscripe`,JSON.stringify(Data),{ ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }


  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/Membership/Edit`, JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  }

  Delete(id: string) {
    let params = new HttpParams()
      .set('id', id)
    return this.httpClient.delete<any>(`${environment.APIURL}/Membership/Delete/${id}`,
      { params, ...this.HttpOptions2}
    ).pipe(catchError(this.handleError));;
  }

  GetMembershipTypes(){
    return this.httpClient.get<any>(
      `${environment.APIURL}/Membership/MembershipTypes`,
      {...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }


}

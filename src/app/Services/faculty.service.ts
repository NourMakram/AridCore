import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
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



  GetAll(page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<any>(
      `${environment.APIURL}/Faculty`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/Faculty/get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/Faculty`, JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  }

  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/Faculty`,JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));

  }

  Delete(id: number) {
    let params = new HttpParams()
      .set('id', id)
    return this.httpClient.delete<any>(`${environment.APIURL}/Faculty?id=${id}`,
      { params, ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));;
  }

  GetFaculties() {
    return this.httpClient.get<any>(`${environment.APIURL}/Faculty/getAll`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }
}

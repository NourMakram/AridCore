import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class AridCertificateService {
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

   
   
  GetAll(templateId:string,page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<any>(
      `${environment.APIURL}/AridCertificate/GetAll/${templateId}/${page}/${pageSize}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/AridCertificate/Get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Details(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/AridCertificate/Details/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

   PdfExport(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/Export/${id}`, {
      responseType: 'blob',  // تحديد أن الاستجابة ستكون من نوع blob (ملف)
    });
  }
PdfExportBadge(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/PDFExportBadge/${id}`, {
      responseType: 'blob',  // تحديد أن الاستجابة ستكون من نوع blob (ملف)
    });
  }
  PdfExportCertLandScap(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/PDFExportCertLandScape/${id}`, {
      responseType: 'blob',  // تحديد أن الاستجابة ستكون من نوع blob (ملف)
    });
  }
  PdfExportLetter(id: number): Observable<Blob> {
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/PDFExportLetter/${id}`, {
      responseType: 'blob',  // تحديد أن الاستجابة ستكون من نوع blob (ملف)
    });
  }
  





 GetUserCertificate(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/AridCertificate/UserCertificate/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/AridCertificate`,JSON.stringify(Data),{...this.HttpOptions2}).pipe(catchError(this.handleError));
  }
  Pay(id:number){
    return this.httpClient.post(`${environment.APIURL}/AridCertificate/Pay/${id}`,null,{...this.HttpOptions2}).pipe(catchError(this.handleError));

  }

   Issue(Data:any){
    return this.httpClient.post(`${environment.APIURL}/AridCertificate/Issue`,JSON.stringify(Data),{...this.HttpOptions2}).pipe(catchError(this.handleError));

  }
  CheckIssue(userId:string,templateId:string){
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/Issue/${userId}/${templateId}`,
      {...this.HttpOptions2});

  }

   GetCertificate(userId:string,templateId:string){
    return this.httpClient.get(`${environment.APIURL}/AridCertificate/Get/${userId}/${templateId}`,
      {...this.HttpOptions2});

  }

  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/AridCertificate/Edit`,JSON.stringify(Data),{...this.HttpOptions2}).pipe(catchError(this.handleError));

  }
  EditName(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/AridCertificate/EditName`,JSON.stringify(Data),{...this.HttpOptions2}).pipe(catchError(this.handleError));

  }

  Delete(id: number) {
    let params = new HttpParams()
      .set('id', id)
    return this.httpClient.delete<any>(`${environment.APIURL}/AridCertificate/${id}`,
       { params, ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  
}

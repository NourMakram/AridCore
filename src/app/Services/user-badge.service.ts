import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserBadgeService {
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


HasBadge(userId:string,badgeId:number){
  
  return this.httpClient.get<any>(`${environment.APIURL}/UserBadges/hasBadge/${userId}/${badgeId}`,
    { ...this.HttpOptions2 }
  ).pipe(catchError(this.handleError));
}
  

  GetUserBadge(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/UserBadges/Personal/${userId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/UserBadges`,
       JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }
  AddInvoation(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/UserBadges/Add/InnovativeBadge`,
       JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  
  }

    Get(id: number): Observable<any> {
      return this.httpClient.get<any>(`${environment.APIURL}/UserBadges/Get/${id}`,
        { ...this.HttpOptions2 }
      ).pipe(catchError(this.handleError));
    }

  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/UserBadges/Edit`,
       JSON.stringify(Data), { ...this.HttpOptions2 }).pipe(catchError(this.handleError));
  }

  Delete(id: number) {
    let params = new HttpParams()
      .set('id', id)
    return this.httpClient.delete<any>(`${environment.APIURL}/UserBadges/${id}`,
      { params, ...this.HttpOptions2}
    ).pipe(catchError(this.handleError));;
  }

  GetAll(page:number,pageSize:number,search:string,badgeId:number,Stuats:number){
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('badge', badgeId)
      .set('Stuats', Stuats);

      if(search!=null){
        params.set('search',search)
      }
    return this.httpClient.get<any>(
      `${environment.APIURL}/UserBadges/GetAll/${page}/${pageSize}?search=${search}&Stuats=${Stuats}&badge=${badgeId}`,
      {params,...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }

  Apply(userId:string,badgeId:number){
    return this.httpClient.get<any>(`${environment.APIURL}/UserBadges/Apply/${userId}/${badgeId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));

  }

  ReApply(userId:string,badgeId:number){
    return this.httpClient.put<any>(`${environment.APIURL}/UserBadges/ReApply/${userId}/${badgeId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));

  }
  BadgeApplication(userId:string,badgeId:number){
    return this.httpClient.post<any>(`${environment.APIURL}/UserBadges/BadgeApplication/${userId}/${badgeId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));

  }

}

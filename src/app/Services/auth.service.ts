import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo, UserModel, userModel2 } from '../Models/UserModel';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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


  

  onLogin(Data: any) {
   return this.httpClient.post(`${environment.APIURL}/Account/Login`,JSON.stringify(Data),{ ...this.HttpOptions2 }).pipe(
      map((response: any) => {
        // if (response) {
        //   this.TokenService.SetToken(response.token);
        //   this.TokenService.SetUserId(response.userId);
 
        // }
        return response;
      }))
  }

  OnLogout(){
    this.TokenService.RemoveToken();
    this.TokenService.RemoveUserId();
    this.TokenService.RemoveRole();
    this.Router.navigateByUrl("/Login");
  }
  
  onRegister(Data: any) {
   return this.httpClient.post(`${environment.APIURL}/Account/Register`,JSON.stringify(Data),{ ...this.HttpOptions2 })
    .pipe(
      map((response: any) => {
        return response;
      }))
  }
  ChangePassword(Data:any){
  return  this.httpClient.post(`${environment.APIURL}/Account/ChangePassword`,JSON.stringify(Data),{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }

  SendConfirmCode(Email:string){
   return this.httpClient.get(`${environment.APIURL}/Account/ResetPasswordStep1/${Email}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }
  ConfirmEmail(Data:any){
   return this.httpClient.post(`${environment.APIURL}/Account/ResetPasswordStep2`,JSON.stringify(Data),{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }
  ResetPassword(Data:any){
   return this.httpClient.post(`${environment.APIURL}/Account/ResetPasswordStep3`,
   JSON.stringify(Data),{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }

  GetUser(userId:string){
    return this.httpClient.get<UserModel>(`${environment.APIURL}/Account/GetUser/${userId}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }

  UpdateInfo(Data:any){
    return this.httpClient.put(`${environment.APIURL}/Account/update/Information`, Data,{ ...this.HttpOptions1 })
    .pipe( catchError(this.handleError)
  )
  }

  updateCV(Data:any){
    return this.httpClient.put(`${environment.APIURL}/Account/update/CV`,  Data,{ ...this.HttpOptions1 })
    .pipe( catchError(this.handleError)
    )
  }

  updateContact(Data:any){
    return this.httpClient.put(`${environment.APIURL}/Account/update/ContactDetails`,Data,{ ...this.HttpOptions1 })
    .pipe( catchError(this.handleError)
    )
  }

  updateSummery(Data:any){
    return this.httpClient.put(`${environment.APIURL}/Account/update/Summery`,Data,{ ...this.HttpOptions1 })
    .pipe( catchError(this.handleError)
    )
  }

  GetUserInfo(userId:string){
    return this.httpClient.get<userModel2>(`${environment.APIURL}/Account/GetDetails/${userId}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }
  GerUsersByUnivercity(univercityId:number,count:number){
    return this.httpClient.get<UserInfo[]>(`${environment.APIURL}/Account/GetUsersByUnivercity/${univercityId}/${count}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }

  SendDAL(Email:string){
    return this.httpClient.get<any>(`${environment.APIURL}/Account/SendDAL/${Email}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }
  LoginByDAL(DAL:string){
  return this.httpClient.get<any>(`${environment.APIURL}/Account/LoginWithDAL/${DAL}`,{ ...this.HttpOptions2 })
    .pipe( catchError(this.handleError)
    )
  }
  InviteFriend(Data:any){
    return  this.httpClient.post(`${environment.APIURL}/Account/InviteFriend`,JSON.stringify(Data),{ ...this.HttpOptions2 })
        .pipe( catchError(this.handleError)
        )
  }

}

import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class ScientificTweetServiceService {
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



  GetAll(userId:string,page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams();


    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<any>(
      `${environment.APIURL}/ScientificTweets/GetAll/${userId}/${page}/${pageSize}`,
      { params, ...this.HttpOptions2 }
    ).pipe(
      catchError(this.handleError)
    );
  }
 
    


  Get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/ScientificTweets/Get/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  GetReplies(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/ScientificTweets/Replies/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

   ISLike(userId:string,tweetId:number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/ScientificTweets/IsLike/${userId}/${tweetId}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }


  Details(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.APIURL}/ScientificTweets/Details/${id}`,
      { ...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));
  }

  Create(Data: any) {
    return this.httpClient.post(`${environment.APIURL}/ScientificTweets`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));
  }

   Delete(id: number) {
    return this.httpClient.delete<any>(`${environment.APIURL}/ScientificTweets/${id}`,
      {...this.HttpOptions2 }
    ).pipe(catchError(this.handleError));;
  }


  Edit(Data: any) {
    return this.httpClient.put(`${environment.APIURL}/ScientificTweets`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));

  }

  AddReply(Data:any){
    
  return this.httpClient.post(`${environment.APIURL}/ScientificTweets/AddTweetReply`,Data,{ ...this.HttpOptions1} ).pipe(catchError(this.handleError));


  }

   AddLike(Data:any){
    
  return this.httpClient.post(`${environment.APIURL}/ScientificTweets/AddTweetLike`,JSON.stringify(Data),{ ...this.HttpOptions2} ).pipe(catchError(this.handleError));

  }

  RemoveLike(tweetId:number,userId:string){
    
  return this.httpClient.delete(`${environment.APIURL}/ScientificTweets/RemoveTweetLike/${tweetId}/${userId}`,{ ...this.HttpOptions2} ).pipe(catchError(this.handleError));

  }


    

  


}

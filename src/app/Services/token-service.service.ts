import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  public IsAuthentication = new BehaviorSubject<boolean>(false);
  public UserId$ = new BehaviorSubject<boolean>(false);
  public Role$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = this.GetToken();
    if (token != null) {
      this.IsAuthentication.next(true);
    }
    const userId = this.GetUserId();
    if(userId!=null){
       this.UserId$.next(true);
    }
    const RoleName =this.GetRole();
    if(RoleName!=null){
      this.Role$.next(true);
    }

  }
//========================================================================================
SetUserId(userId:string){
  localStorage.setItem('userId',userId);
  this.UserId$.next(true);
}
GetUserId(): string | null {
  return localStorage.getItem('userId') || null;
}
RemoveUserId() {
  localStorage.removeItem('userId');
  this.UserId$.next(false);

}
//========================================================================================

  SetToken(token: string) {
    localStorage.setItem('token', token);
    this.IsAuthentication.next(true);
  }

  GetToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  RemoveToken() {
    localStorage.removeItem('token');
    this.IsAuthentication.next(false);

  }
//========================================================================================
SetRole(role: string) {
  localStorage.setItem('role', role);
  this.Role$.next(true);
}

GetRole(): string | null {
  return localStorage.getItem('role') || null;
}

RemoveRole() {
  localStorage.removeItem('role');
  this.Role$.next(false);

}

}

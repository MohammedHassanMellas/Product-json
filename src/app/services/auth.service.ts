import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean =false;
  constructor(private http : HttpClient, private appState : AppStateService) { }
  async  login(username : string, password : string){
    let user:any= await firstValueFrom(this.http.get("http://localhost:8089/users/"+username)) ;
    console.log(password);
    console.log(user.password);
    console.log(atob(user.password))

    if (password==atob(user.password)){
     let decodedJwt:any = jwtDecode(user.token)
     this.appState.setAuthState({
       username : decodedJwt.sub,
       roles : decodedJwt.roles,
       token : user.token
     });
     this.isAuthenticated=true;
     return Promise.resolve(true);
   }else {
     return Promise.reject("Bad credentials");
    }
  }
}

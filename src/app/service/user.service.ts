import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials, UserInfo, Users } from '../Store/Model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  APIBasedUrl = "http://localhost:3000/user";

  registerUser(userData: Users){
    return this.http.post(this.APIBasedUrl, userData)
  }

  loginUser(userData: UserCredentials){
    return this.http.get<UserInfo[]>(this.APIBasedUrl+"?username="+userData.username+"&password="+userData.password)
  }

  duplicateUserName(username: string){
    return this.http.get<UserInfo[]>(this.APIBasedUrl+"?username="+username)
  }
}

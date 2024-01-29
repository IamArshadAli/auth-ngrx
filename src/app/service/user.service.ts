import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Store/Model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  APIBasedUrl = "http://localhost:3000/user";

  registerUser(userData: Users){
    return this.http.post(this.APIBasedUrl, userData)
  }
}

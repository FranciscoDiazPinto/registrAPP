import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://registr-api.fly.dev/user';

  constructor(private http: HttpClient) {}

  // crear usuario
  createUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/create`;
    return this.http.post(url, userData);
  }


  

  // login
  loginUser(loginData: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, loginData);
  }
}

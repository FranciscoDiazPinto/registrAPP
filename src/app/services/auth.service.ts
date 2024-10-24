import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://registr-api.fly.dev';  // URL base de la API

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(username: string, password: string, groupId: number): Observable<any> {
    const url = `${this.apiUrl}/user/login`;  // Endpoint para login
    const body = {
      username: username,
      password: password,
      groupId: groupId  // El groupId que se usará (en este caso 10)
    };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers });
  }
}

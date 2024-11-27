import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): Observable<any> {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(
      (u: any) => u.email === username && u.password === password
    );

    if (usuario) {
      return of(usuario); // Devuelve el usuario encontrado
    } else {
      throw new Error('Usuario o contraseña incorrectos');
    }
  }
}

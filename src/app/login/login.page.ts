import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importa el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';  // Cambiado de email a username
  password: string = '';
  groupId: number = 10;   // Definir el groupId fijo

  constructor(private router: Router, private authService: AuthService) { }  // Inyecta AuthService

  ngOnInit() {}

  onLogin() {
    // Verificar que los campos no estén vacíos
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Llamar al servicio de autenticación para hacer login
    this.authService.login(this.username, this.password, this.groupId).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        alert(`Bienvenido ${this.username}`);
        
        // Redirigir a la página principal o dashboard
        this.router.navigate(['/index2']);
      },
      error: (err) => {
        console.error('Error de login:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (usuario) => {
        alert(`Bienvenido ${usuario.nombre}`);
        // Redirigir según el rol
        if (usuario.rol === 'Profesor') {
          this.router.navigate(['/profesor']);
        } else if (usuario.rol === 'Alumno') {
          this.router.navigate(['/alumno']);
        } else {
          alert('Rol no reconocido.');
        }
      },
      error: (err) => {
        console.error('Error de login:', err);
        alert('Usuario o contraseña incorrectos');
      },
    });
  }
}

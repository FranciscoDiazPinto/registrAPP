import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }  // Inyecta Router

  ngOnInit() {
  }

  onLogin() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Verificar si el usuario existe y las credenciales coinciden
    if (usuarioGuardado && usuarioGuardado.email === this.email && usuarioGuardado.password === this.password) {
      alert('Login exitoso');
      
      // Redirigir a la página principal o dashboard
      this.router.navigate(['/index2']);  // Redirige a la página deseada
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}

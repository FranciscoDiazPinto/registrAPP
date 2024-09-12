import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  rut: string = '';
  preguntaSecreta: string = '';
  respuestaSecreta: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  onRecoverPassword() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Verificar si el RUT y la pregunta secreta coinciden con el usuario registrado
    if (usuarioGuardado && usuarioGuardado.rut === this.rut && 
        usuarioGuardado.preguntaSecreta === this.preguntaSecreta &&
        usuarioGuardado.respuestaSecreta === this.respuestaSecreta) {
      
      // Cambiar la contraseña al RUT
      usuarioGuardado.password = this.rut;
      localStorage.setItem('usuario', JSON.stringify(usuarioGuardado));
      
      alert('Contraseña restablecida. Ahora puedes iniciar sesión con tu RUT como contraseña.');
      this.router.navigate(['/login']); // Redirige al login
    } else {
      alert('Los datos proporcionados no coinciden.');
    }
  }
}

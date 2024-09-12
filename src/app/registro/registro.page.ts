import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  preguntaSecreta: string = '';
  respuestaSecreta: string = '';

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectChange(event: any) {
    console.log('Opción seleccionada:', event.detail.value);
  }

  onRegister() {
    // Guardar los datos en Local Storage
    const usuario = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      rut: this.rut,
      email: this.email,
      password: this.password,
      preguntaSecreta: this.preguntaSecreta,
      respuestaSecreta: this.respuestaSecreta
    };

    // Guardamos el objeto del usuario en Local Storage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mensaje de confirmación
    alert('Registro exitoso. Ahora puede iniciar sesión.');
    
    // Redirigir a la página de inicio
    this.router.navigate(['/home']);
  }
}

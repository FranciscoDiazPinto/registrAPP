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
    // Verificar si algún campo está vacío
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.rut || !this.email || !this.password || !this.preguntaSecreta || !this.respuestaSecreta) {
      // Mostrar un mensaje de error si algún campo está vacío
      alert('Por favor, complete todos los campos antes de registrar.');
      return; // Detener la ejecución si hay campos vacíos
    } else {
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
}  
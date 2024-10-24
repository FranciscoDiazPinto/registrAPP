import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  // Inyecta HttpClient y Router en el constructor
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {}

  onSelectChange(event: any) {
    console.log('Opción seleccionada:', event.detail.value);
  }

  onRegister() {
    // Verificar si algún campo está vacío
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.rut || !this.email || !this.password || !this.preguntaSecreta || !this.respuestaSecreta) {
      alert('Por favor, complete todos los campos antes de registrar.');
      return;
    }

    // Validar formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validar contraseña: al menos 8 caracteres y debe ser alfanumérica
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(this.password)) {
      alert('La contraseña debe tener al menos 8 caracteres y debe ser alfanumérica.');
      return;
    }

    // Datos del usuario
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

    // Hacer la solicitud POST a la API para registrar al usuario
    this.http.post('http://URL_DE_TU_API/registrar', usuario)
      .pipe(
        catchError(error => {
          // Manejo de errores
          alert('Ocurrió un error durante el registro.');
          return throwError(error);
        })
      )
      .subscribe(response => {
        // Suponiendo que la respuesta contiene información sobre el éxito o fallo del registro
        if (response && response['isValid']) {
          alert('Registro exitoso. Ahora puede iniciar sesión.');
          this.router.navigate(['/home']);  // Redirige a la página de inicio o login
        } else {
          alert('Error en el registro. Por favor, intente nuevamente.');
        }
      });
  }
}

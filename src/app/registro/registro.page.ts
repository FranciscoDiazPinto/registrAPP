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
    // Verificar y crear cuentas de profesores si no existen
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (!usuariosExistentes.some((user: any) => user.rol === 'Profesor')) {
      const profesores = [
        {
          nombre: 'Profesor1',
          apellidoPaterno: 'Apellido1',
          apellidoMaterno: 'Apellido1',
          rut: '12345678-9',
          email: 'profesor1@correo.com',
          password: 'Profesor123',
          preguntaSecreta: 'colorFavorito',
          respuestaSecreta: 'Azul',
          rol: 'Profesor'
        },
        {
          nombre: 'Profesor2',
          apellidoPaterno: 'Apellido2',
          apellidoMaterno: 'Apellido2',
          rut: '98765432-1',
          email: 'profesor2@correo.com',
          password: 'Profesor123',
          preguntaSecreta: 'nombreMascota',
          respuestaSecreta: 'Rex',
          rol: 'Profesor'
        }
      ];
      localStorage.setItem('usuarios', JSON.stringify([...usuariosExistentes, ...profesores]));
    }
  }

  onRegister() {
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.rut || !this.email || !this.password || !this.preguntaSecreta || !this.respuestaSecreta) {
      alert('Por favor, complete todos los campos antes de registrar.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(this.password)) {
      alert('La contraseña debe tener al menos 8 caracteres y debe ser alfanumérica.');
      return;
    }

    // Guardar los datos con el rol de "Alumno"
    const usuario = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      rut: this.rut,
      email: this.email,
      password: this.password,
      preguntaSecreta: this.preguntaSecreta,
      respuestaSecreta: this.respuestaSecreta,
      rol: 'Alumno' // Asignar rol automáticamente
    };

    // Guardar en Local Storage
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuariosExistentes.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

    alert('Alumno registrado exitosamente.');
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  email: string = '';
  password: string = '';
  respuestaSecreta: string = '';

  constructor() { }

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
      email: this.email,
      password: this.password,
      respuestaSecreta: this.respuestaSecreta
    };

    // Guardamos el objeto del usuario en Local Storage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Mensaje de confirmación
    alert('Registro exitoso. Ahora puede iniciar sesión.');
  }
}

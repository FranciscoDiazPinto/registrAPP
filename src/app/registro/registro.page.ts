import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSelectChange(event: any) {
    console.log('Opción seleccionada:', event.detail.value);
    // Aquí puedes realizar otras acciones basadas en el valor seleccionado
  }

}

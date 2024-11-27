import { Component } from '@angular/core';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage {
  qrData: string = ''; // Contenido del QR
  qrCodeUrl: string | null = null; // URL del QR generado

  constructor() {}

  generateQR() {
    if (this.qrData.trim() === '') {
      alert('Por favor, ingresa el contenido para el QR.');
      return;
    }

    // Construye la URL de la API con el contenido del QR
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      this.qrData
    )}`;
  }
}

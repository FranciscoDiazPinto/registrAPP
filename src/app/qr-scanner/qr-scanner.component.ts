import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {

  constructor() {}

  async startScan() {
    try {
      // Solicitar permisos
      await BarcodeScanner.requestPermissions();

      // Iniciar el escaneo
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        console.log('Resultado del escaneo: ', result.content);
      }
    } catch (error) {
      console.error('Error al escanear: ', error);
    }
  }

  async stopScan() {
    await BarcodeScanner.stopScan();
  }

  async hide() {
    await BarcodeScanner.hideBackground();
  }

  async show() {
    await BarcodeScanner.showBackground();
  }
}

import { Component } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  constructor() {}

  async startScan() {
    try {
      // Iniciar el escaneo de código QR
      const result = await CapacitorBarcodeScanner.scan();

      // Verificar si el escaneo fue exitoso y mostrar el contenido
      if (result?.hasContent) {
        console.log('Código escaneado: ', result.content); // Mostrar el contenido del código escaneado
      } else {
        console.log('No se detectó contenido en el código escaneado');
      }
    } catch (error) {
      console.error('Error al intentar escanear el código: ', error);
    }
  }

  stopScan() {
    // Detener el escaneo si es necesario
    console.log('Escaneo detenido');
  }
}

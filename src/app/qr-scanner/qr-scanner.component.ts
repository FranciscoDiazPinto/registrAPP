import { Component } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';  // Usa CapacitorBarcodeScanner

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {

  constructor() { }

  async startScanning() {
    try {
      // Solicitar permisos para la cámara
      await CapacitorBarcodeScanner.requestPermissions();

      // Iniciar escaneo
      const result = await CapacitorBarcodeScanner.startScan();

      if (result.hasContent) {
        // Mostrar el contenido escaneado
        console.log('Contenido del QR:', result.content);
        alert('Código escaneado: ' + result.content);
      } else {
        console.log('No se detectó ningún código.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      alert('Hubo un error al intentar escanear el código');
    }
  }

  stopScanning() {
    CapacitorBarcodeScanner.stopScan(); // Detener el escáner si es necesario
  }
}

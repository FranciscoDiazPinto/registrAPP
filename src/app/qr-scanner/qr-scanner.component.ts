import { Component } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  scanResult: string = ''; // Variable para almacenar el resultado del escaneo

  constructor() {}

  async startScan() {
    try {
      // Verificar permisos antes de iniciar el escaneo
      const status = await CapacitorBarcodeScanner.checkPermission({ force: true });

      if (!status.granted) {
        console.log('Permiso no concedido');
        return;
      }

      // Ocultar la interfaz de usuario para preparar el escaneo
      CapacitorBarcodeScanner.hideBackground();

      // Iniciar el escaneo
      const result = await CapacitorBarcodeScanner.startScan();

      // Detener el escaneo y mostrar la interfaz nuevamente
      CapacitorBarcodeScanner.showBackground();

      // Verificar si el resultado tiene contenido
      if (result.hasContent) {
        this.scanResult = result.content;  // Almacenar el resultado
        console.log('Código escaneado: ', this.scanResult);
      } else {
        console.log('No se detectó contenido en el código escaneado');
      }
    } catch (error) {
      console.error('Error al intentar escanear el código: ', error);

      // Asegurarse de mostrar la interfaz en caso de error
      CapacitorBarcodeScanner.showBackground();
    }
  }

  stopScan() {
    try {
      CapacitorBarcodeScanner.stopScan();
      console.log('Escaneo detenido');
    } catch (error) {
      console.error('Error al detener el escaneo: ', error);
    }
  }
}

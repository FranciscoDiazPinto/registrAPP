import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  constructor() {}

  async startScan() {
    try {
      // Verificar permisos antes de iniciar el escaneo
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (!status.granted) {
        console.log('Permiso no concedido');
        return;
      }

      // Ocultar la interfaz de usuario para preparar el escaneo
      BarcodeScanner.hideBackground();

      // Iniciar el escaneo
      const result = await BarcodeScanner.startScan();

      // Detener el escaneo y mostrar la interfaz nuevamente
      BarcodeScanner.showBackground();

      // Verificar si el resultado tiene contenido
      if (result.hasContent) {
        console.log('Código escaneado: ', result.content);
      } else {
        console.log('No se detectó contenido en el código escaneado');
      }
    } catch (error) {
      console.error('Error al intentar escanear el código: ', error);

      // Asegurarse de mostrar la interfaz en caso de error
      BarcodeScanner.showBackground();
    }
  }

  stopScan() {
    try {
      BarcodeScanner.stopScan();
      console.log('Escaneo detenido');
    } catch (error) {
      console.error('Error al detener el escaneo: ', error);
    }
  }
}

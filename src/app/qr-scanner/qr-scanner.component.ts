import { Component } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  scanResult: string | null = null;

  constructor(private alertController: AlertController) {}

  // Solicitar permisos y escanear
  async scanQRCode(): Promise<void> {
    try {
      // Verificar si el dispositivo soporta escaneo
      const supported = await CapacitorBarcodeScanner.isSupported();
      if (!supported) {
        await this.presentAlert(
          'No Compatible',
          'Tu dispositivo no soporta el escaneo de códigos QR.'
        );
        return;
      }

      // Solicitar permisos
      const { granted } = await CapacitorBarcodeScanner.requestPermissions();
      if (!granted) {
        await this.presentAlert(
          'Permiso Denegado',
          'No se concedió permiso para usar la cámara.'
        );
        return;
      }

      // Iniciar el escaneo
      const result = await CapacitorBarcodeScanner.scanBarcode({
        targetFormats: ['QR_CODE'], // Específicamente para QR
      });

      // Manejar el resultado
      if (result.hasContent) {
        this.scanResult = result.content; // Guardar el resultado del QR
        console.log('Código QR escaneado:', result.content);
      } else {
        this.scanResult = 'No se detectó ningún contenido en el QR.';
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      await this.presentAlert(
        'Error',
        'Ocurrió un problema durante el escaneo. Intenta nuevamente.'
      );
    }
  }

  // Mostrar alertas personalizadas
  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

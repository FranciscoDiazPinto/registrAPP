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

  async checkPermissions(): Promise<boolean> {
    const status = await CapacitorBarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      await this.presentAlert('Permisos requeridos', 'Por favor, concede permiso para usar la cámara.');
      return false;
    }
    return true;
  }

  async scanQRCode(): Promise<void> {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) return;

    // Ocultar la interfaz para empezar el escaneo
    CapacitorBarcodeScanner.hideBackground();

    try {
      const result = await CapacitorBarcodeScanner.startScan();

      // Mostrar la interfaz nuevamente
      CapacitorBarcodeScanner.showBackground();

      if (result.content) {
        this.scanResult = result.content; // Captura el contenido del QR
        console.log('Código QR escaneado:', result.content);
      } else {
        this.scanResult = 'No se detectó contenido en el código QR.';
      }
    } catch (error) {
      CapacitorBarcodeScanner.showBackground();
      console.error('Error durante el escaneo:', error);
      this.scanResult = 'Hubo un error al intentar escanear.';
    }
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  isSupported = false; // Para verificar si el escáner es soportado
  qrCodes: string[] = []; // Para almacenar los códigos QR escaneados (registro de asistencia)

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Verifica si el escáner es soportado en el dispositivo
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scanQRCode(): Promise<void> {
    // Solicita permisos para la cámara
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentPermissionAlert();
      return;
    }

    try {
      // Escanea y filtra únicamente códigos QR
      const { barcodes } = await BarcodeScanner.scan();
      const qrCodes = barcodes
        .filter((barcode) => barcode.format === 'QR_CODE') // Filtra solo códigos QR
        .map((barcode) => barcode.rawValue); // Extrae el contenido del código QR

      if (qrCodes.length > 0) {
        // Registra la asistencia agregando el código QR escaneado a la lista
        this.qrCodes.push(...qrCodes);
        this.presentAssistanceRegisteredAlert(qrCodes); // Muestra un mensaje de éxito
      } else {
        this.presentNoQRCodeAlert();
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      this.presentErrorAlert();
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Es necesario otorgar permiso para usar la cámara y escanear códigos QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentNoQRCodeAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'No se detectó un código QR',
      message: 'Asegúrate de que el código QR sea visible para la cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ocurrió un error al intentar escanear el código QR. Inténtalo de nuevo.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAssistanceRegisteredAlert(qrCodes: string[]): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Asistencia Registrada',
      message: `La asistencia del código QR ${qrCodes.join(', ')} ha sido registrada.`,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

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
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content);
      }
    } else {
      console.error('Permiso de escaneo no concedido');
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    console.log('Escaneo detenido');
  }
}
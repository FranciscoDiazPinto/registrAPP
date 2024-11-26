import { Component, OnInit } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  scannedData: string | null = null;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data:', barcodeData);
      this.scannedData = barcodeData.text;
      // Aquí puedes llamar a un servicio para registrar la asistencia.
      this.registerAttendance(this.scannedData);
    }).catch(err => {
      console.error('Error al escanear el código QR:', err);
    });
  }

  registerAttendance(data: string | null) {
    if (data) {
      // Aquí enviarías los datos al backend usando un servicio HTTP.
      console.log('Registrando asistencia para:', data);
    } else {
      console.warn('No se detectó ningún dato para registrar.');
    }
  }



}

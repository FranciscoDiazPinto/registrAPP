import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';
import { AsistenciaPage } from './asistencia.page';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';  // Importa el componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule
  ],
  declarations: [AsistenciaPage, QrScannerComponent]  // Declara solo en este módulo
})
export class AsistenciaPageModule {}

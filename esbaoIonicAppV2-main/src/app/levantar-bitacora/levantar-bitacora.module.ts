import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LevantarBitacoraPageRoutingModule } from './levantar-bitacora-routing.module';
import { LevantarBitacoraPage } from './levantar-bitacora.page';

// Importa los módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

//configuracion de capacitor
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevantarBitacoraPageRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    SelectDropDownModule
  ],
  declarations: [LevantarBitacoraPage]
})
export class LevantarBitacoraPageModule {}

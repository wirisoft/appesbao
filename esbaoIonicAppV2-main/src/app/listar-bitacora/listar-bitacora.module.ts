import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarBitacoraPageRoutingModule } from './listar-bitacora-routing.module';

import { ListarBitacoraPage } from './listar-bitacora.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarBitacoraPageRoutingModule,
    PipesModule
  ],
  declarations: [ListarBitacoraPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega esta línea
})
export class ListarBitacoraPageModule {}

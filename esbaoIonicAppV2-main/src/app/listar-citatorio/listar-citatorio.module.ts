import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCitatorioPageRoutingModule } from './listar-citatorio-routing.module';

import { ListarCitatorioPage } from './listar-citatorio.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCitatorioPageRoutingModule,
    PipesModule
  ],
  declarations: [ListarCitatorioPage]
})
export class ListarCitatorioPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCitatorioPageRoutingModule } from './editar-citatorio-routing.module';

import { EditarCitatorioPage } from './editar-citatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCitatorioPageRoutingModule
  ],
  declarations: [EditarCitatorioPage]
})
export class EditarCitatorioPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarAlumnoPageRoutingModule } from './listar-alumno-routing.module';

import { ListarAlumnoPage } from './listar-alumno.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListarAlumnoPageRoutingModule
  ],
  declarations: [ListarAlumnoPage]
})
export class ListarAlumnoPageModule {}

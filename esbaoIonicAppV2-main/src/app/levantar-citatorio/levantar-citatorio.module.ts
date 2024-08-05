import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevantarCitatorioPageRoutingModule } from './levantar-citatorio-routing.module';

import { LevantarCitatorioPage } from './levantar-citatorio.page';

// Importa los módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevantarCitatorioPageRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    SelectDropDownModule
  ],
  declarations: [LevantarCitatorioPage]
})
export class LevantarCitatorioPageModule {}

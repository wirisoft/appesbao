import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevantarTutorPageRoutingModule } from './levantar-tutor-routing.module';

import { LevantarTutorPage } from './levantar-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevantarTutorPageRoutingModule
  ],
  declarations: [LevantarTutorPage]
})
export class LevantarTutorPageModule {}

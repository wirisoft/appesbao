import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevantarBitacoraPage } from './levantar-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: LevantarBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevantarBitacoraPageRoutingModule {}

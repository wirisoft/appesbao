import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarBitacoraPage } from './listar-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: ListarBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarBitacoraPageRoutingModule {}

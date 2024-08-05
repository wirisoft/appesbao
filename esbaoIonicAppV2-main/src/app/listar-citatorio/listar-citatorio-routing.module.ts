import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarCitatorioPage } from './listar-citatorio.page';

const routes: Routes = [
  {
    path: '',
    component: ListarCitatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarCitatorioPageRoutingModule {}

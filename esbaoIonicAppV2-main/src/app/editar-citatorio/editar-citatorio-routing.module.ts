import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCitatorioPage } from './editar-citatorio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCitatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCitatorioPageRoutingModule {}

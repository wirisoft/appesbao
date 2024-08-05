import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevantarCitatorioPage } from './levantar-citatorio.page';

const routes: Routes = [
  {
    path: '',
    component: LevantarCitatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevantarCitatorioPageRoutingModule {}

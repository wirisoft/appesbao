import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAlumnoPage } from './listar-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: ListarAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarAlumnoPageRoutingModule {}

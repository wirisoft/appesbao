import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevantarTutorPage } from './levantar-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: LevantarTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevantarTutorPageRoutingModule {}

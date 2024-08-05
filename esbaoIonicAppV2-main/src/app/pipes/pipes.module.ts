import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { Base64ToUrlPipe } from './safe-image.pipe';


@NgModule({
  declarations: [FiltroPipe, Base64ToUrlPipe],
  exports: [ FiltroPipe, Base64ToUrlPipe ]
})
export class PipesModule { }

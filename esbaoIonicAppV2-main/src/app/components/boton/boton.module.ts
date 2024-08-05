import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BotonComponent } from "./boton.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [BotonComponent],
  imports: [CommonModule, 
            IonicModule],
  exports: [BotonComponent],
  providers: [],
  bootstrap: []
})
export class BotonModule {}
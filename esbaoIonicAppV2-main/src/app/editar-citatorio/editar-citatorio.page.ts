import { Component, OnInit } from '@angular/core';
import { CitatorioEntity } from '../models/citatorio-entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BitacoraService } from '../services/bitacora.service';
import { CitatorioService } from '../services/citatorio.service';

@Component({
  selector: 'app-editar-citatorio',
  templateUrl: './editar-citatorio.page.html',
  styleUrls: ['./editar-citatorio.page.scss'],
})
export class EditarCitatorioPage implements OnInit {
  citatorio: CitatorioEntity | null = null;
  citatorioId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private citatorioService: CitatorioService,
    private toastController: ToastController
  ) { 
    const id = this.route.snapshot.paramMap.get('id');
    this.citatorioId = id ? +id : 0;
  }

  ngOnInit() {
    this.loadCitatorio();
  }

  loadCitatorio(){
    this.citatorioService.getCitatorioById(this.citatorioId).subscribe(
      (data: CitatorioEntity) => {
        this.citatorio = data;
      },
      (error) => {
        console.error('Error fetching citatorio:', error);
        this.presentToast('Error al cargar el citatorio');
      }
    );
  }

  onSubmit(){
    if(this.citatorio){
      this.citatorioService.updateCitatorio(this.citatorioId, this.citatorio).subscribe(
        (response) => {
          this.presentToast('Citatorio actualizado exitosamente');
          this.router.navigate(['/listar-citatorio']);
        },
        (error) => {
          console.error('Error actualizando citatorio:', error);
          this.presentToast('Error al actualizar el citatorio')
        }
      );
    }
  }

  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}

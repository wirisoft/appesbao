import { Component, OnInit } from '@angular/core';
import { CitatorioService } from '../services/citatorio.service';
import { CitatorioEntity } from '../models/citatorio-entity.model';
import { ReportService } from '../services/report.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar-citatorio',
  templateUrl: './listar-citatorio.page.html',
  styleUrls: ['./listar-citatorio.page.scss'],
})
export class ListarCitatorioPage implements OnInit {

  citatorios: CitatorioEntity[] = [];
  textoBuscarC = '';
  citatorioSeleccionado: CitatorioEntity | null = null;

  constructor(private citatorioService: CitatorioService, 
              private reportService: ReportService, 
              private toastController: ToastController,
              private alertController: AlertController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.citatorioService.getAllCitatorios().subscribe(citatorios => {
      console.log(citatorios);
      this.citatorios = citatorios;
    });
  }
  
  buscar(event: CustomEvent) {
    this.textoBuscarC = (event.target as HTMLInputElement).value;
  }

  seleccionarCitatorio(citatorio: CitatorioEntity) {
    this.citatorioSeleccionado = citatorio;
    console.log('Citatorio seleccionado:', this.citatorioSeleccionado);
  }

  async generarPdf(citatorioId: number) {
    try {
      const pdfBlob = await this.reportService.getCitatorioPdf(citatorioId).toPromise();
      if (pdfBlob) {
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `citatorio_${citatorioId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.presentToast('PDF generado y descargado exitosamente.');
      } else {
        this.presentToast('Error al generar el PDF: Archivo vacío.');
      }
    } catch (error) {
      this.presentToast('Error al generar el PDF.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  editarCitatorio(citatorio: CitatorioEntity){
    if(citatorio && citatorio.id){
      this.navCtrl.navigateForward(`/editar-citatorio/${citatorio.id}`);
    }else{
      this.presentToast('Error: No se pudo encontrar el ID del citatorio. ');
    }
  }

  async confirmarEliminarCitatorio(id: number | undefined){
    if(id === undefined){
      this.presentToast('Error: No se pudo encontrar el ID del citatorio. ');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta citatorio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.eliminarCitatorio(id);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarCitatorio(id: number){
    this.citatorioService.deleteCitatorio(id).subscribe(
      response => {
        this.presentToast('Citatorio eliminado exitosamente.')
        this.ngOnInit();
      },
      error => {
        this.presentToast('Error al eliminar el citatorio');
        console.error(error);
      }
    );
  }

}

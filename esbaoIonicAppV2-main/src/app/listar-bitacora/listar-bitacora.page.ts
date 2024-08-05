
import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../services/bitacora.service';
import { BitacoraEntity } from '../models/bitacora-entity.model';
import { ReportService } from '../services/report.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar-bitacora',
  templateUrl: './listar-bitacora.page.html',
  styleUrls: ['./listar-bitacora.page.scss'],
})
export class ListarBitacoraPage implements OnInit {
  bitacoras: BitacoraEntity[] = [];
  TextoBuscarB = '';
  bitacoraSeleccionada: BitacoraEntity | null = null;

  constructor(private bitacoraService: BitacoraService, 
              private reportService: ReportService, 
              private toastController: ToastController,
              private alertController: AlertController,
              private navCtrl: NavController ) { }

  ngOnInit() {
    this.bitacoraService.getAllBitacoras().subscribe(bitacoras => {
      console.log(bitacoras);
      this.bitacoras = bitacoras;
    });
  }

  buscar(event: CustomEvent) {
    this.TextoBuscarB = (event.target as HTMLInputElement).value;
  }

  seleccionarBitacora(bitacora: BitacoraEntity) {
    this.bitacoraSeleccionada = bitacora;
    console.log('Bitacora seleccionada:', this.bitacoraSeleccionada);
  }

  async generarPdf(bitacoraId: number) {
    try {
      const pdfBlob = await this.reportService.getBitacoraPdf(bitacoraId).toPromise();
      if (pdfBlob) {
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bitacora_${bitacoraId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.presentToast('PDF generado y descargado exitosamente.');
      } else {
        this.presentToast('Error al generar el PDF: Archivo vacío.');
      }
    } catch (error) {}
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  editarBitacora(bitacora: BitacoraEntity) {
    if (bitacora && bitacora.id) {
      this.navCtrl.navigateForward(`/editar-bitacora/${bitacora.id}`);
    } else {
      this.presentToast('Error: No se pudo encontrar el ID de la bitácora.');
    }
  }
  
  async confirmarEliminarBitacora(id: number | undefined) {
    if (id === undefined) {
      this.presentToast('Error: No se pudo encontrar el ID de la bitácora.');
      return;
    }
  
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta bitácora?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.eliminarBitacora(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  eliminarBitacora(id: number) {
    this.bitacoraService.deleteBitacora(id).subscribe(
      response => {
        this.presentToast('Bitácora eliminada exitosamente.');
        // Refresh the list
        this.ngOnInit();
      },
      error => {
        this.presentToast('Error al eliminar la bitácora.');
        console.error(error);
      }
    );
  }

}


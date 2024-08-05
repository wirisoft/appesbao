import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitacoraService } from '../services/bitacora.service';
import { BitacoraEntity } from '../models/bitacora-entity.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-bitacora',
  templateUrl: './editar-bitacora.page.html',
  styleUrls: ['./editar-bitacora.page.scss'],
})
export class EditarBitacoraPage implements OnInit {
  bitacora: BitacoraEntity | null = null;
  bitacoraId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bitacoraService: BitacoraService,
    private toastController: ToastController
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.bitacoraId = id ? +id : 0;
  }

  ngOnInit() {
    this.loadBitacora();
  }

  loadBitacora() {
    this.bitacoraService.getBitacoraById(this.bitacoraId).subscribe(
      (data: BitacoraEntity) => {
        this.bitacora = data;
      },
      (error) => {
        console.error('Error fetching bitacora:', error);
        this.presentToast('Error al cargar la bitácora');
      }
    );
  }

  onSubmit() {
    if (this.bitacora) {
      this.bitacoraService.updateBitacora(this.bitacoraId, this.bitacora).subscribe(
        (response) => {
          this.presentToast('Bitácora actualizada exitosamente');
          this.router.navigate(['/listar-bitacora']);
        },
        (error) => {
          console.error('Error updating bitacora:', error);
          this.presentToast('Error al actualizar la bitácora');
        }
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && this.bitacora) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.bitacora!.evidencia_img = reader.result as string;
      };
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
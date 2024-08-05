import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { CuentaService } from '../services/cuenta.service';
import { Subscription } from 'rxjs';
import { UserEntity } from '../models/user-entity.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit, OnDestroy {
  email: string | undefined;
  password: string | undefined;
  nombre_usuario: string | undefined;
  apellido: string | undefined;
  userSubscription: Subscription | undefined;
  users: UserEntity[] = [];
  userId: number | undefined;
  user: UserEntity | undefined;

  constructor(private alertController: AlertController, private router: Router, private authService: AuthService, private cuentaService: CuentaService) { }




  alertInputs: any[] = [];

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user && user.sub) {  // assuming 'sub' contains the user id
        this.userId = user.sub;
        if (this.userId !== undefined) {
          this.cuentaService.getUserById(this.userId).subscribe(userData => {
            this.user = userData;
          });
        }
      }
    });
  }


  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.authService.logout();
            this.router.navigateByUrl('/inicio');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar sesión cancelada');
          }
        }
      ]
    });

    await alert.present();
  }

  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController) {
this.formulario = this.formBuilder.group({
email: ['', [Validators.required, Validators.email]],
password: ['', Validators.required]
});
}


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formulario.valid) {
      const email = this.formulario.get('email')?.value;
      const password = this.formulario.get('password')?.value;
      this.authService.login(email, password);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}

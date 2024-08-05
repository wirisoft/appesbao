import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AlumnoService } from '../services/alumno.service';
import { TutorService } from '../services/tutor.service';
import { AlumnoEntity } from '../models/alumno-entity.model';
import { TutorEntity } from '../models/tutor-entity.model';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.page.html',
  styleUrls: ['./agregar-alumno.page.scss'],
})
export class AgregarAlumnoPage implements OnInit {
  nombre_alumno: string = '';
  primer_apellido: string = '';
  segundo_apellido: string = '';
  turno: string = '';
  grado: string = '';
  grupo: string = '';
  matricula: string = '';
  area_especialidad: string = '';
  telefono: string = '';

  nombre_tutor: string = '';
  tipo_tutor: string = '';
  telefono_tutor: string = '';
  email_tutor: string = '';

  alumnos: AlumnoEntity[] = [];
  selectedAlumno: AlumnoEntity | null = null;

  constructor(
    private navCtrl: NavController, 
    private alumnoService: AlumnoService,
    private tutorService: TutorService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  async submitForm() {
    if (this.validateForm()) {
      const alumno: AlumnoEntity = {
        alumno_id: 0,
        nombre_alumno: this.nombre_alumno,
        primer_apellido: this.primer_apellido,
        segundo_apellido: this.segundo_apellido,
        turno: this.turno,
        grado: this.grado,
        grupo: this.grupo,
        matricula: this.matricula,
        area_especialidad: this.area_especialidad,
        telefono: this.telefono,
      };
  
      try {
        // Guarda el alumno primero
        const alumnoResponse = await this.alumnoService.createAlumno(alumno).toPromise();
        console.log('Alumno agregado:', alumnoResponse);
  
        // Crea el tutor y asigna el alumno guardado
        const tutor: TutorEntity = {
          tutor_id: 0,
          nombre_tutor: this.nombre_tutor,
          tipo_tutor: this.tipo_tutor,
          telefono_tutor: this.telefono_tutor,
          email_tutor: this.email_tutor,
          alumno: alumnoResponse  // Asigna el alumno guardado
        };
  
        // Guarda el tutor
        const tutorResponse = await this.tutorService.createTutor(tutor).toPromise();
        console.log('Tutor agregado:', tutorResponse);
  
        this.presentToast('Alumno y Tutor agregados exitosamente');
        this.navCtrl.back();
      } catch (error) {
        console.error('Error al agregar el alumno o tutor:', error);
        this.presentToast('Error al agregar el alumno o tutor. Por favor, intenta de nuevo.');
      }
    }
  }
  

  validateForm(): boolean {
    if (!this.nombre_alumno || !this.primer_apellido || !this.matricula || !this.nombre_tutor) {
      this.presentToast('Por favor, completa todos los campos obligatorios');
      return false;
    }
    return true;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}

import { TutorService } from './../services/tutor.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../services/Auth.service';
import { CitatorioService } from './../services/citatorio.service';
import { Component, OnInit } from '@angular/core';
import { AlumnoEntity } from '../models/alumno-entity.model';
import { AlumnoService } from '../services/alumno.service';
import { UserEntity } from '../models/user-entity.model';
import { firstValueFrom } from 'rxjs';
import { CitatorioEntity } from '../models/citatorio-entity.model';
import { CuentaService } from '../services/cuenta.service';
import { TutorEntity } from '../models/tutor-entity.model';
import { stringToByteArray } from '../utils/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levantar-citatorio',
  templateUrl: './levantar-citatorio.page.html',
  styleUrls: ['./levantar-citatorio.page.scss'],
})
export class LevantarCitatorioPage implements OnInit {
  usuarios: UserEntity[] = [];
  
  selectedUsuario: UserEntity | null = null;
  
  
  nombre_citatorio: string = '';
  asunto: string = '';
  dia_citatorio: number = 0;
  mes_citatorio: string = '';
  ano_citatorio: string = '';
  hora_citatorio: string = '';
  fecha_citatorio: string = '';
  departamento: string = '';
  
  
  alumnos: AlumnoEntity[] = [];
  selectedAlumno: AlumnoEntity | null = null;
  config: any = {
    displayKey: "nombreCompleto", // Muestra el nombre completo del alumno
    search: true, // Habilita la búsqueda
    height: 'auto', // Altura automática
    placeholder: 'Selecciona un alumno',
    customComparator: () => {}, // Opcional: para una comparación personalizada
    limitTo: 10, // Limita la cantidad de opciones mostradas
    moreText: 'más', // Texto para opciones adicionales
    noResultsFound: 'No se encontraron resultados', // Texto cuando no hay resultados
    searchPlaceholder: 'Buscar', // Placeholder para la búsqueda
    searchOnKey: 'nombreCompleto', // Clave para buscar
    multiple: false // Permite seleccionar solo un elemento
  };

  tutores: TutorEntity[] = [];
  selectedTutor: TutorEntity | null = null;
  configTutor: any = {
    displayKey: "nombreCompleto", // Muestra el nombre completo del tutor
    search: true, // Habilita la búsqueda
    height: 'auto', // Altura automática
    placeholder: 'Selecciona un tutor',
    customComparator: () => {}, // Opcional: para una comparación personalizada
    limitTo: 10, // Limita la cantidad de opciones mostradas
    moreText: 'más', // Texto para opciones adicionales
    noResultsFound: 'No se encontraron resultados', // Texto cuando no hay resultados
    searchPlaceholder: 'Buscar', // Placeholder para la búsqueda
    searchOnKey: 'nombreCompleto', // Clave para buscar
    multiple: false // Permite seleccionar solo un elemento
  };




  nombreTutor:string = '';
  usuarioStorage: any = localStorage.getItem('usuario');
  alumnoStorage:any=localStorage.getItem('alumno');
  tutorStorage:any=localStorage.getItem('tutor');
  

  constructor(
    private alumnoService: AlumnoService,
    private citatorioService: CitatorioService,
    private authService: AuthService,
    private tutorService: TutorService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarTutores();
    this.setAutoDateTime();
    
  }

  displayAlumnoFn(alumno: AlumnoEntity) {
    return `${alumno.nombre_alumno} ${alumno.primer_apellido} ${alumno.segundo_apellido}`;
  }

  displayTutorFn(tutor: TutorEntity) {
    return `${tutor.nombre_tutor} ${tutor.tipo_tutor} ${tutor.telefono_tutor} ${tutor.email_tutor}`;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async cargarTutores() {
    try{
      this.tutores = await firstValueFrom(this.tutorService.getAllTutors());
      this.tutores = this.tutores.map(tutor => ({
        ...tutor,
        nombreCompleto: `${tutor.nombre_tutor} ${tutor.tipo_tutor} ${tutor.telefono_tutor} ${tutor.email_tutor}`
      }));

    }catch (error) {
      console.error('Error al cargar tutores:', error);
      this.presentToast('Error al cargar la lista de tutores. Por favor, intenta de nuevo.');
    }
  }

  async cargarAlumnos() {
    try {
      this.alumnos = await firstValueFrom(this.alumnoService.getAllAlumnos());
      this.alumnos = this.alumnos.map(alumno => ({
        ...alumno,
        nombreCompleto: `${alumno.nombre_alumno} ${alumno.primer_apellido} ${alumno.segundo_apellido}`
      }));
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
      this.presentToast('Error al cargar la lista de alumnos. Por favor, intenta de nuevo.');
    }
  }

  

  selectAlumno(alumno: AlumnoEntity) {
    this.selectedAlumno = alumno;
  }

  selectTutor(tutor: TutorEntity) {
    this.selectedTutor = tutor;
  }

  selectUsuario(usuario: UserEntity) {
    this.selectedUsuario = usuario;
  }

  setAutoDateTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Formato de 2 dígitos
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Formato de 2 dígitos
    const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Formato de 2 dígitos
    this.hora_citatorio = `${hours}:${minutes}:${seconds}`;
    // Formato de fecha YYYY-MM-DD para que sea compatible con la base de datos
    this.fecha_citatorio = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
  }

  async submitForm() {
    if (this.validateForm()) {
      console.log('Alumno seleccionado:', this.selectedAlumno);
      console.log('Tutor seleccionado:', this.selectedTutor);
  
      if (!this.selectedAlumno) {
        this.presentToast('Por favor, selecciona un alumno');
        return;
      }
      if (!this.selectedTutor) {
        this.presentToast('Por favor, selecciona un tutor');
        return;
      }
  
      const idAlumno = this.selectedAlumno.alumno_id || this.selectedAlumno.id;
      const idTutor = this.selectedTutor.tutor_id || this.selectedTutor.id;
  
      console.log('ID Alumno:', idAlumno);
      console.log('ID Tutor:', idTutor);
  
      const citatorio: CitatorioEntity = {
        citatorio_id: 0,
        nombre_citatorio: this.nombre_citatorio,
        asunto: this.asunto,
        dia_citatorio: this.dia_citatorio,
        mes_citatorio: this.mes_citatorio,
        ano_citatorio: this.ano_citatorio,
        hora_citatorio: this.hora_citatorio,
        fecha_citatorio: this.fecha_citatorio,
        departamento: this.departamento,
        alumno_id: idAlumno,
        tutor_id: idTutor,
        tutor: { id: idTutor },
        alumno: { id: idAlumno }
      };
  
      console.log('Citatorio a enviar:', JSON.stringify(citatorio, null, 2));
  
      try {
        const response = await this.citatorioService.createCitatorio(citatorio).toPromise();
        console.log('Respuesta del servidor:', response);
        this.presentToast('Citatorio agregado exitosamente');
        this.router.navigate(['/tabs/menu']); // Redirige al menú
        console.log('Redirigiendo a menú');
      } catch (error) {
        console.error('Error al agregar el citatorio:', error);
        this.presentToast('Error al agregar el citatorio. Por favor, intenta de nuevo.');
      }
    }
  }

  validateForm(): boolean {
    if (!this.nombre_citatorio || !this.asunto || !this.hora_citatorio || !this.fecha_citatorio || !this.departamento) {
      this.presentToast('Por favor, completa todos los campos obligatorios');
      return false;
    }
    return true;
  }


  compareWith(o1: AlumnoEntity, o2: AlumnoEntity | AlumnoEntity[] | null): boolean {
    return o1 && o2 ? o1.alumno_id === (Array.isArray(o2) ? o2[0].alumno_id : o2.alumno_id) : o1 === o2;
  }

}

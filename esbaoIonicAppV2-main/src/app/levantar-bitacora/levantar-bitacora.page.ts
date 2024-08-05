import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlumnoService } from '../services/alumno.service';
import { AlumnoEntity } from '../models/alumno-entity.model';
import { BitacoraService } from '../services/bitacora.service';
import { BitacoraEntity } from '../models/bitacora-entity.model';
import { AuthService } from '../services/Auth.service';
import { UserEntity } from '../models/user-entity.model';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { firstValueFrom } from 'rxjs';
import { CuentaService } from '../services/cuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levantar-bitacora',
  templateUrl: './levantar-bitacora.page.html',
  styleUrls: ['./levantar-bitacora.page.scss'],
})
export class LevantarBitacoraPage implements OnInit {
  
  usuarios: UserEntity[] = [];
  selectedUsuario: UserEntity | null = null;
  loggedUser: UserEntity | null = null;
  
  dia_bitacora: number = 0;
  hora_bitacora: string = ''; // Ahora será una cadena vacía inicialmente
  mes_bitacora: string = '';
  anio: number = 2024;
  insidencia: string = '';
  pdf_bitacora: string | null = null;
  evidencia_img: string | null = null; // Mantén evidencia_img como string Base64

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

  nombreUsuario:string = '';
  usuarioStorage:any=localStorage.getItem('usuario');

/** displayFn?: any;
    displayKey?: string;
    search?: boolean;
    height?: string;
    placeholder?: string;
    customComparator?: (a: any, b: any) => number;
    limitTo?: number;
    moreText?: string;
    noResultsFound?: string;
    searchPlaceholder?: string;
    searchOnKey?: string;
    clearOnSelection?: boolean;
    inputDirection?: string;
    selectAllLabel?: string;
    enableSelectAll?: boolean; */



  constructor(
    private alumnoService: AlumnoService,
    private bitacoraService: BitacoraService,
    private toastController: ToastController,
    private authService: AuthService,
    private cuentaService: CuentaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarUsuarios();
    this.obtenerHoraLocal();
    
    if (this.usuarioStorage !== null) {
      // Parsea el JSON solamente si no es null
       this.nombreUsuario = JSON.parse(this.usuarioStorage).nombre_usuario;
    } else {
      console.error('No se encontró ningún usuario en localStorage');
      // Manejar el caso donde no se encuentre el usuario en localStorage
    } 
  }

  obtenerHoraLocal() {
    const now = new Date();
    // Formato de hora local (HH:mm:ss)
    this.hora_bitacora = now.toLocaleTimeString('es-MX', { hour12: false });
  }

  displayAlumnoFn(alumno: AlumnoEntity) {
    return `${alumno.nombre_alumno} ${alumno.primer_apellido} ${alumno.segundo_apellido}`;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  validateForm(): boolean {
    if (!this.dia_bitacora || !this.mes_bitacora || !this.anio || !this.insidencia) {
      this.presentToast('Por favor, completa todos los campos obligatorios');
      return false;
    }
    return true;
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

  async cargarUsuarios() {
    try {
      this.usuarios = await firstValueFrom(this.cuentaService.getAllUsers());
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.presentToast('Error al cargar la lista de usuarios. Por favor, intenta de nuevo.');
    }
  }

  selectAlumno(alumno: AlumnoEntity) {
    this.selectedAlumno = alumno;
  }

  selectUsuario(usuario: UserEntity) {
    this.selectedUsuario = usuario;
  }

  async submitForm() {

    // Obtener la hora local al momento de enviar el formulario
    const now = new Date();
    this.hora_bitacora = now.toLocaleTimeString('es-MX', { hour12: false });


    if (this.validateForm()) {
      let idUser = null;
      console.log('UsuarioStorage:', this.usuarioStorage)
      if (this.usuarioStorage !== null) {
        // Parsea el JSON solamente si no es null
        idUser = JSON.parse(this.usuarioStorage).id;
        console.log(JSON.parse(this.usuarioStorage));
      } else {
        console.error('No se encontró ningún usuario en localStorage');
        // Manejar el caso donde no se encuentre el usuario en localStorage
      }  

      let idAlumno = null;
      console.log('idAlumno:', this.usuarioStorage)
      if (this.selectedAlumno !== null) {
        // Parsea el JSON solamente si no es null
        idAlumno = this.selectedAlumno.id;
        
      } else {
        console.error('No se encontró ningún idAlumno ');
        // Manejar el caso donde no se encuentre el usuario en localStorage
      }  
      
      const bitacora: BitacoraEntity = {
        bitacora_id: 0,
        dia_bitacora: this.dia_bitacora,
        hora_bitacora: this.hora_bitacora,
        mes_bitacora: this.mes_bitacora,
        anio: this.anio,
        insidencia: this.insidencia,
        pdf_bitacora: this.pdf_bitacora,
        evidencia_img: this.evidencia_img, // Enviar como cadena Base64
        alumno_id: this.selectedAlumno?.alumno_id,
        user: { id: idUser }, // Asigna el objeto UserEntity con el id obtenido
        alumno: {id: idAlumno}
      };
      
      try {
        const response = await this.bitacoraService.createBitacora(bitacora).toPromise();
        console.log('Bitacora agregada:', response);
        this.presentToast('Bitacora agregada exitosamente');
        this.router.navigate(['/tabs/menu']); // Redirige al menú
        console.log('Redirigiendo a menú');
      } catch (error) {
        console.error('Error al agregar la bitacora:', error);
        this.presentToast('Error al agregar la bitacora. Por favor, intenta de nuevo.');
      }
    }
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
    
      if (image.base64String) {
        this.evidencia_img = image.base64String; // Actualiza evidencia_img como cadena Base64
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      this.presentToast('Error al tomar la foto. Por favor, intenta de nuevo.');
    }
  }

  compareWith(o1: AlumnoEntity, o2: AlumnoEntity | AlumnoEntity[] | null): boolean {
    return o1 && o2 ? o1.alumno_id === (Array.isArray(o2) ? o2[0].alumno_id : o2.alumno_id) : o1 === o2;
  }
}

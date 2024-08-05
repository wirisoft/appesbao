import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { AlumnoEntity } from '../models/alumno-entity.model';

@Component({
  selector: 'app-listar-alumno',
  templateUrl: './listar-alumno.page.html',
  styleUrls: ['./listar-alumno.page.scss'],
})
export class ListarAlumnoPage implements OnInit {
  alumnos: AlumnoEntity[] = [];
  textoBuscar = '';
  alumnoSeleccionado: AlumnoEntity | null = null;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.getAllAlumnos().subscribe(alumnos => {
      console.log(alumnos);
      this.alumnos = alumnos;
    });
  }

  buscar(event: CustomEvent) {
    this.textoBuscar = (event.target as HTMLInputElement).value;
  }

  seleccionarAlumno(alumno: AlumnoEntity) {
    this.alumnoSeleccionado = alumno;
    console.log('Alumno seleccionado:', this.alumnoSeleccionado);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlumnoEntity } from '../models/alumno-entity.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  //private apiUrl = 'http://localhost:8080/api/alumno';

  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080/api/alumno';

  constructor(private http: HttpClient) { }

  getAllAlumnos(): Observable<AlumnoEntity[]> {
    return this.http.get<AlumnoEntity[]>(`${this.apiUrl}/get-all`);
  }

  getAlumnoById(id: number): Observable<AlumnoEntity> {
    return this.http.get<AlumnoEntity>(`${this.apiUrl}/get/${id}`);
  }

  createAlumno(alumno: AlumnoEntity): Observable<AlumnoEntity> {
    return this.http.post<AlumnoEntity>(`${this.apiUrl}/create`, alumno);
  }

  updateAlumno(id: number, alumno: AlumnoEntity): Observable<AlumnoEntity> {
    return this.http.put<AlumnoEntity>(`${this.apiUrl}/update/${id}`, alumno);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}

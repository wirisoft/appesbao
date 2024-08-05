import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TutorEntity } from '../models/tutor-entity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  //private apiUrl = 'http://localhost:8080/api/tutor';
  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080/api/tutor';

  constructor(private http:HttpClient) { }

  createTutor(tutor: TutorEntity):Observable<TutorEntity>{
    return this.http.post<TutorEntity>(`${this.apiUrl}/create`, tutor);
  }

  // Obtener todos los tutores
  getAllTutors(): Observable<TutorEntity[]> {
    return this.http.get<TutorEntity[]>(`${this.apiUrl}/get-all`);
  }

  // Obtener un tutor por ID
  getTutorById(id: number): Observable<TutorEntity> {
    return this.http.get<TutorEntity>(`${this.apiUrl}/get/${id}`);
  }

  // Actualizar un tutor
  updateTutor(id: number, tutor: TutorEntity): Observable<TutorEntity> {
    return this.http.put<TutorEntity>(`${this.apiUrl}/update/${id}`, tutor);
  }

  // Eliminar un tutor
  deleteTutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  
}

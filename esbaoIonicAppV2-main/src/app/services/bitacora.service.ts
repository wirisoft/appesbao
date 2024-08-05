import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BitacoraEntity } from '../models/bitacora-entity.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  //private apiUrl = 'http://localhost:8080/api/bitacora';
  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080/api/bitacora';

  constructor(private http : HttpClient) { }

  // Crear una bitácora
  createBitacora(bitacora: BitacoraEntity): Observable<BitacoraEntity> {
    return this.http.post<BitacoraEntity>(`${this.apiUrl}/create`, bitacora);
  }

  // Obtener todas las bitácoras
  getAllBitacoras(): Observable<BitacoraEntity[]> {
    return this.http.get<BitacoraEntity[]>(`${this.apiUrl}/get-all`);
  }

  // Obtener una bitácora por ID
  getBitacoraById(id: number): Observable<BitacoraEntity> {
    return this.http.get<BitacoraEntity>(`${this.apiUrl}/get/${id}`);
  }

  // Actualizar una bitácora
  updateBitacora(id: number, bitacora: BitacoraEntity): Observable<BitacoraEntity> {
    return this.http.put<BitacoraEntity>(`${this.apiUrl}/update/${id}`, bitacora);
  }

  // Eliminar una bitácora
  deleteBitacora(id: number): Observable<{ [key: string]: string }> {
    return this.http.delete<{ [key: string]: string }>(`${this.apiUrl}/delete/${id}`);
  }

}

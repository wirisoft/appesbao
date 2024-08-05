import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CitatorioEntity } from '../models/citatorio-entity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitatorioService {

  //private apiUrl = 'http://localhost:8080/api/citatorio';
  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080/api/citatorio';
  

  constructor(private http: HttpClient, private router: Router) { }

  getAllCitatorios(): Observable<CitatorioEntity[]> {
    return this.http.get<CitatorioEntity[]>(`${this.apiUrl}/get-all`);
  }
  

  getCitatorioById(id: number): Observable<CitatorioEntity> {
    return this.http.get<CitatorioEntity>(`${this.apiUrl}/get/${id}`);
  }

  createCitatorio(citatorio: CitatorioEntity): Observable<CitatorioEntity> {
    return this.http.post<CitatorioEntity>(`${this.apiUrl}/create`, citatorio);
  }

  updateCitatorio(id: number, citatorio: CitatorioEntity): Observable<CitatorioEntity> {
    return this.http.put<CitatorioEntity>(`${this.apiUrl}/update/${id}`, citatorio);
  }

  deleteCitatorio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

}

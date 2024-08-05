import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  //private baseUrl = 'http://localhost:8080/api/pdf';
  private baseUrl = 'http://vps-4243804-x.dattaweb.com:8080/api/pdf';

  constructor(private http: HttpClient) { }


  getCitatorioPdf(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/citatorio/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getBitacoraPdf(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/bitacora/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

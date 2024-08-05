import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BitacoraEntity} from '../models/bitacora-entity.model';


@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  private apiUrl = 'http://localhost:8080/api/bitacora'; // Ajusta esto a la URL de tu backend


  constructor(private http: HttpClient) { }

  imprimirbitacora(){

  }

  
  


}

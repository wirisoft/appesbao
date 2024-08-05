import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  navigateToAgregarAlumno() {
    this.router.navigate(['/agregar-alumno']);
  }
  navigateToListarAlumno() {
    this.router.navigate(['/listar-alumno']);
  }

  navigateToListarCitatorio(){
    this.router.navigate(['/listar-citatorio']);
  }

  navigateToListarBitacora(){
    this.router.navigate(['/listar-bitacora']);
  }

}

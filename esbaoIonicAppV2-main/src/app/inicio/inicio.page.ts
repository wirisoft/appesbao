import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  clearLocalStorageAndNavigate() {
    // Limpiar el localStorage
    localStorage.clear();
    
    // Navegar a la página de inicio de sesión
    this.router.navigate(['/inicio-sesion']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:8080';

  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080';
  currentUser: any;
  // private userSubject = new BehaviorSubject<{ user_id: number | undefined,
  //                                             email: string | undefined,
  //                                             password: string | undefined,
  //                                             nombre_usuario: string | undefined,
  //                                             apellido: string| undefined; } | null>(null);
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: any) {
    this.currentUser = user;
    this.userSubject.next(user);
    //localStorage.setItem('usuario', JSON.stringify(user));
    console.log('Datos guardados en setUser', user);
  }

  getUser() {
    console.log('Datos guardados de getUser', this.userSubject.value);
    return this.userSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');

  }

  login(email: string, password: string) {
    const loginData = { email, password };
    this.http.post<{ jwt: string }>(`${this.apiUrl}/auth/login`, loginData).subscribe((response:any) => {
      console.log('Respuesta del login:', response);
      if (response.jwt) {
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('usuario',JSON.stringify(response.user));
        this.router.navigate(['/tabs/home']);
        
        const user = this.decodeJWT(response.jwt);
        this.setUser(user);
      } else {
        alert('Correo electrónico o contraseña incorrectos');
      }
    }, error => {
      console.error(error);
      alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
  }

  decodeJWT(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  

  register(email: string, password: string, nombreCompleto: string) {
    const usuario = { correoElectronico: email, contrasenia: password, nombreCompleto };
    this.http.post(`${this.apiUrl}/create`, usuario).subscribe(() => {
      alert('Usuario creado con éxito');
      this.router.navigate(['/tabs/home']);
      this.setUser(usuario);
    }, (error) => {
      console.error(error);
      alert('Ocurrió un error al intentar crear el usuario. Por favor, inténtalo de nuevo más tarde.');
    });
  }

  update(email: string, password: string, nombre_usuario: string, apellido: string) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.idUsuario) {
      const updatedUsuario = { idUsuario: usuario.idUsuario, correoElectronico: email, contrasenia: password, nombre_usuario, apellido };
      this.http.put(`${this.apiUrl}/update/${usuario.idUsuario}`, updatedUsuario).subscribe(() => {
        console.log('Usuario actualizado con éxito');
        //localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
        this.setUser(updatedUsuario);
      }, (error) => {
        console.error(error);
        alert('Ocurrió un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo más tarde.');
      });
    }
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigateByUrl('/inicio');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../models/user-entity.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  //private apiUrl = 'http://localhost:8080/users';

  private apiUrl = 'http://vps-4243804-x.dattaweb.com:8080/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.apiUrl + '/get-all');
  }

  getUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/get/${id}`);
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(`${this.apiUrl}/create`, user);
  }

  updateUser(id: number, user: UserEntity): Observable<UserEntity> {
    return this.http.put<UserEntity>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}

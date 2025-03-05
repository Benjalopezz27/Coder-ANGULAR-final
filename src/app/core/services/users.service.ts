import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { User } from '../../modules/dashboard/pages/users/models';
import { concatMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`)
  }
  deleteUserById(id:string){
    return this.httpClient.delete(`${environment.baseApiUrl}/users/${id}`).pipe(concatMap(()=> this.getUsers()))
  }
  updateUserById(id: string, data: {name: string, email: string, role: string, password: string}): Observable<User[]>{
    return this.httpClient.patch<User>(`${environment.baseApiUrl}/users/${id}`,data).pipe(concatMap(()=>this.getUsers()))
  }
  addUser(payload: {name: string, email:string, role: string, password: string}):Observable<User[]>{
    return this.httpClient.post<User[]>(`${environment.baseApiUrl}/users`,payload).pipe(concatMap(()=> this.getUsers()))
  }
  getUserDetails(id:string): Observable<User>{
      return this.httpClient.get<User>(`${environment.baseApiUrl}/users/${id}`)
  }
}

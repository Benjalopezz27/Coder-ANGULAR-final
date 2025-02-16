import { Injectable, LOCALE_ID } from '@angular/core';
import { loginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';

const FAKE_USER_DB: User[] = [
  {
    id: generateRandomString(6),
    name: 'Administrador',
    email: 'admin@gmail.com',
    password: '123456',
    accessToken: "AHWGBJBAHAGUgeybuwbceuy",
    role: 'ADMIN'
  },
  {
    id: generateRandomString(6),
    name: 'Empleado',
    email: 'employee@gmail.com',
    password: '123456',
    accessToken: "BUBCHbbuhiwcnwkenfkj",
    role: 'EMPLOYEE'
  }
]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private _authUser$ = new BehaviorSubject<User | null>(null)
authUser$ = this._authUser$.asObservable();


constructor(private router: Router) {}

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(
      map(user => user?.role === 'ADMIN')
    )
  }
  logout(): void {
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login'])
  }
  login(payload: loginPayload):void {
    const loginResult = FAKE_USER_DB.find(user => user.email === payload.email && user.password === payload.password);

    if(!loginResult){
      alert('Credenciales incorrectas');
      return;
  } 
    localStorage.setItem('token', loginResult.accessToken)
    this._authUser$.next(loginResult)  
    this.router.navigate(['dashboard', 'home'])

}
isAuthenticated(): Observable<boolean> {
  
  const storageUser = FAKE_USER_DB.find(user => user.accessToken === localStorage.getItem('token'));
  
  this._authUser$.next(storageUser || null);

  return this.authUser$.pipe(
    map(user => !!user)
  )
}

}

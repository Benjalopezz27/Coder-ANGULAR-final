import { Injectable, LOCALE_ID } from '@angular/core';
import { loginPayload } from '../../modules/auth/models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthState } from '../../store/auth/auth.reducer';
import { selectAuthUser } from '../../store/auth/auth.select';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 authUser$: Observable<User |null>
  
  
  constructor(private httpClient: HttpClient,private router: Router, private store: Store) {

   this.authUser$ = this.store.select(selectAuthUser)
  }
  
  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(
      map(user => user?.role === 'ADMIN')
    )
  }
  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(AuthActions.unsetAuthUser())
    this.router.navigate(['auth', 'login'])
  }
  login(payload: loginPayload):void {
    this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`).subscribe({
      next: (users)=>{
        if(!users[0]){
          alert('Credenciales incorrectas');
      return;
        } else {
          localStorage.setItem('token', users[0].accessToken)
          this.store.dispatch(AuthActions.setAuthUser({user: users[0]}))
          this.router.navigate(['dashboard', 'home'])
        }
      },
      error: (err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 0){
            alert("El servidor esta caido")
          }
        }
      }
    })
}
isAuthenticated(): Observable<boolean> {
  return  this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?accessToken=${localStorage.getItem('token')}`).pipe(map((res)=>{
    const userResult = res[0]
    if(userResult){
      this.store.dispatch(AuthActions.setAuthUser({user: userResult}))
    }
    return !!userResult
  }))
}

}

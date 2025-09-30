import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl:string = 'http://localhost:8080/api/auth';

  private accessToken$ = new BehaviorSubject<string | null>(null); // store the access token in-memory only for security 

  constructor(private readonly http:HttpClient){}

  registerUser(userDetails:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,userDetails);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(res => {
          this.accessToken$.next(res.accessToken); // set the access token to the accessToken$ variable
        }),
        catchError(err => {
          console.error('Login error:', err);
          return throwError(() => err.error?.message || 'Login failed');
        })
      );
  }
}

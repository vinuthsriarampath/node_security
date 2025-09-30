import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl:string = 'http://localhost:8080/api/auth';

  constructor(private readonly http:HttpClient){}

  registerUser(userDetails:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,userDetails);
  }
  
}

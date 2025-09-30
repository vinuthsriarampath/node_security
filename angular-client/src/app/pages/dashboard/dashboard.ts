import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user-service';
import { catchError, last, Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  currentUser$: Observable<any>;

  constructor(private readonly userService:UserService){
    this.currentUser$=this.userService.getCurrentUser().pipe(
      catchError(err => {
        alert(err.message);
        return of(null); // Fallback to null or empty object on error
      })
    );
  }
}

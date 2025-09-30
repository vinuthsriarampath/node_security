import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  currentUser:any;

  constructor(private readonly userService:UserService){
    userService.getCurrentUser().subscribe({
      next: (res)=>{
        userService=res;
      },
      error: (err)=> {
        alert(err.message);
      }
    })
  }
}

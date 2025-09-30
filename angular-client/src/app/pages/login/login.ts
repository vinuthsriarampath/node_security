import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public email:string = '' ;
  public password: string = '';

  onSubmit() {
    throw new Error('Method not implemented.');
  }

}

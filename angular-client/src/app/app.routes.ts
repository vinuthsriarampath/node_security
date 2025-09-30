import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        title: 'Login Page',
        path:'',
        component:Login
    },
    {
        title:'Registration Page',
        path:'register',
        component:Register
    }
];

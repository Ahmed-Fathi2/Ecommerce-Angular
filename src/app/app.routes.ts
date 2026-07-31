import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login/login';
import { Register } from './features/auth/register/register/register';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth-guard';
import { Productdetails } from './features/productdetails/productdetails';
import { Cart } from './features/cart/cart';


export const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full'},
{path:'home',component:Home},
{path:'login',component:Login},
{path:'register',component:Register},
{path:'details/:id' , component:Productdetails,canActivate:[authGuard]},
{path:'cart' , component:Cart}

];

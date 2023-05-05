import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule),
    ...canActivate(() => redirectUnauthorizedTo(['/home'])) 
  },
  {
    path: 'quiniela',
    loadChildren: () => import('./quiniela/quiniela.module').then( m => m.QuinielaModule),
    ...canActivate(() => redirectUnauthorizedTo(['/home'])) 
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

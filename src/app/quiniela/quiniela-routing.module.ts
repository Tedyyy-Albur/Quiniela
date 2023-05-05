import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardadoComponent } from './guardado/guardado.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'seleccion', component: GuardadoComponent},
      {path:'**', redirectTo:'seleccion'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuinielaRoutingModule { }

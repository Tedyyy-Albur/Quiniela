import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuinielaRoutingModule } from './quiniela-routing.module';
import { GuardadoComponent } from './guardado/guardado.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";



@NgModule({
  declarations: [
    GuardadoComponent
  ],
  imports: [
    CommonModule,
    QuinielaRoutingModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class QuinielaModule { }

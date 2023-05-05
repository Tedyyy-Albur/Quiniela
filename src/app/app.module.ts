import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { FirestoreModule } from "@angular/fire/firestore";
import { NotiLoginComponent } from './notificaciones/noti-login/noti-login.component';
import { VizualizarDatosComponent } from './notificaciones/vizualizar-datos/vizualizar-datos.component';


const firebaseConfig = {
  apiKey: "AIzaSyAzkq9Cs6oduMeSAip-_KpdgWmk6sWPCws",
  authDomain: "partidos-ac3a0.firebaseapp.com",
  projectId: "partidos-ac3a0",
  storageBucket: "partidos-ac3a0.appspot.com",
  messagingSenderId: "91248741831",
  appId: "1:91248741831:web:b6b9c368cc22f06b4f5de2"
};



@NgModule({
  declarations: [
    AppComponent,
    NotiLoginComponent,
    VizualizarDatosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    FirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

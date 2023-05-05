import { Component, ViewChild } from '@angular/core';
import { PartidosService } from './partidos.service';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import { dateUser } from 'src/interfaces/dateUser';
import {MatSnackBar, MatSnackBarRef, MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { NotiLoginComponent } from './notificaciones/noti-login/noti-login.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'partidos';
  partidosResult: any[] = [];
  btnFuction: boolean = true;


  datosLogin!: UserCredential;
  obj!: dateUser;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private partidos:PartidosService,private router: Router,private _snackBar: MatSnackBar){  }

  ngOnInit(): void {
    
  }

  login(){
    this.partidos.loginwithGoogle().then(resp => {
      this.datosLogin = resp;
      this.getDatosStorage();
      this.router.navigate(['/login/loginAuth']);
      this.btnFuction = !this.btnFuction;
    })
    .catch(error => {
      console.log(error);
    });
  }
    
  getDatosStorage(){
    let obj ={
      id: this.datosLogin.user.uid,
      name: this.datosLogin.user.displayName,
      photo: this.datosLogin.user.photoURL,
      number: this.datosLogin.user.phoneNumber,
    }
    localStorage.setItem('date', JSON.stringify(obj));
  }

  validacionAuth(){
    if (localStorage.getItem("date") == undefined || null ){
      this._snackBar.openFromComponent(NotiLoginComponent, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  changeBtn(){this.btnFuction = !this.btnFuction;}
}

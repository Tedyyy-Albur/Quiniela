import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { PartidosService } from 'src/app/partidos.service';

@Component({
  selector: 'app-noti-login',
  templateUrl: './noti-login.component.html',
  styleUrls: ['./noti-login.component.scss']
})
export class NotiLoginComponent {

  datosLogin!: UserCredential;

  constructor(private partidos:PartidosService,private router: Router){}

  login(){
    this.partidos.loginwithGoogle().then(resp => {
      this.datosLogin = resp;
      this.getDatosStorage();
      this.router.navigate(['/login/loginAuth']);
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

}

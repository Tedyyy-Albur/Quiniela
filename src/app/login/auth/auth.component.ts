import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { PartidosService } from 'src/app/partidos.service';
import { dateUser } from 'src/interfaces/dateUser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private service: PartidosService, private router: Router){ }

datosLogin!: UserCredential;
datosGetLocal!: dateUser;


ngOnInit(): void {
  this.datosGetLocal = JSON.parse(localStorage.getItem("date")!);
  console.log(this.datosGetLocal);
}

  cerrarSesion(){
    this.service.logout()
    .then(() => {  
      this.router.navigate(['/home'])
      localStorage.removeItem("date")
    })
    .catch(error => console.log(error));
  }


}

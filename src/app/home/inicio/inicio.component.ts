import { Component, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { PartidosService } from 'src/app/partidos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private partidos:PartidosService){

  }

  partidosResult: any[] = [];



  btnPush(){
    this.partidos.getNextMatch().subscribe(resp => {
      console.log(resp.response);
      this.partidosResult = resp.response;
    })
  }

}

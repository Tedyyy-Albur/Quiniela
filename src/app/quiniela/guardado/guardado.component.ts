import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { PartidosService } from 'src/app/partidos.service';
import { dateUser } from 'src/interfaces/dateUser';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VizualizarDatosComponent } from 'src/app/notificaciones/vizualizar-datos/vizualizar-datos.component';

@Component({
  selector: 'app-guardado',
  templateUrl: './guardado.component.html',
  styleUrls: ['./guardado.component.scss']
})
export class GuardadoComponent {

  partidosResult: any[] = [];
  gana: string = 'Ganar';
  pierde: string = 'Pierde';
  guardado: any[] = [];
  selec: any = 0;
  respValor: any[] = [];
  datosGetLocal!: dateUser;
  btnHabilida: boolean = true;
  permisosGuardado: number = 0;
  objAlerta: any [] = [];

  constructor(private partidos: PartidosService, public dialog: MatDialog) {
    this.datosGetLocal = JSON.parse(localStorage.getItem("date")!);
    this.btnPush();
    this.obtenerValores();
  }


  btnPush() {
    this.partidos.getNextMatch().subscribe(resp => {
      console.log(resp.response);
      this.partidosResult = resp.response;
    })
  }

  radioChange(event: MatRadioChange, id: any, logo: any, nombreEquipo: any) {
    this.selec = event.value;
    if (this.guardado.length == 0) {
      const valor = { idPartido: id, seleccionado: this.selec, logo: logo, team: nombreEquipo };
      this.guardado.push(valor)
    }

    let nuevoDato = { idPartido: id, seleccionado: this.selec, logo: logo, team: nombreEquipo };

    let index = this.guardado.findIndex(dato => dato.idPartido === nuevoDato.idPartido);

    if (index !== -1) {
      this.guardado[index] = nuevoDato;
    } else {
      this.guardado.push(nuevoDato);
    }
    console.log(this.guardado);

    if (this.guardado.length == this.partidosResult.length) {
      this.btnHabilida = false;
    }
  }

  obtenerValores() {
    this.partidos.obtenerResultados().subscribe(resp => {
      this.respValor = resp;
      console.log(this.respValor);
      let index = this.respValor.findIndex(dato => dato.ids === this.datosGetLocal.id);
      if (this.respValor.length == 0) {
        this.permisosGuardado = 1;
      } else {
        for (let index = 0; index < this.respValor.length; index++) {
          if (this.respValor[index].ids == this.datosGetLocal.id) {
            this.permisosGuardado = 0;
            this.objAlerta = this.respValor[index].resultados;
          }
          else {
            this.permisosGuardado = 1;
          }
        }
      }

    })
  }  
  
  guardar() {
    let obj = {
      ids: this.datosGetLocal.id,
      nombre: this.datosGetLocal.name,
      resultados: this.guardado
    }
    console.log(obj);
    if (this.permisosGuardado == 1) {

      if (this.guardado.length == this.partidosResult.length) {
        this.partidos.agregarQui(obj).then(resp => {
          Swal.fire('Guardado Correctamente, Suerte.')
          this.objAlerta = this.guardado;
        });
      }
    } else {
      Swal.fire('Ya cuentas con un registro.')

    }

  }

  openDialog(): void {
    console.log(this.objAlerta);
   // const dialogRef = this.dialog.open(VizualizarDatosComponent, {panelClass: 'aAlertas', data: this.objAlerta });
    
    if (this.objAlerta.length != 0) {
      const dialogRef = this.dialog.open(VizualizarDatosComponent, {panelClass: 'aAlertas', data: this.objAlerta });
    } else{
      Swal.fire('Tienes que tener un registro.')
    }    
  }

  borrarValor() {
    let index = this.respValor.findIndex(dato => dato.ids === this.datosGetLocal.id);
    const valor = this.respValor[index].id;
    console.log(valor);

    this.partidos.borrarResultados(valor).then(resp => {
      Swal.fire('Borrado el registro.')
    })
  }

  
}

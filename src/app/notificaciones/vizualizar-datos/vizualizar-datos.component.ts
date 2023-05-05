import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dateUser } from 'src/interfaces/dateUser';

@Component({
  selector: 'app-vizualizar-datos',
  templateUrl: './vizualizar-datos.component.html',
  styleUrls: ['./vizualizar-datos.component.scss']
})
export class VizualizarDatosComponent {

  datosGetLocal!: dateUser;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,){
    this.datosGetLocal = JSON.parse(localStorage.getItem("date")!);
    console.log(data);
    
  }



}

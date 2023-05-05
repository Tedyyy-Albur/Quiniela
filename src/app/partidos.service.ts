import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from "@angular/fire/firestore"
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from "@angular/fire/auth";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private apiUrl = 'https://v3.football.api-sports.io/';

  constructor(private http: HttpClient, private auth: Auth, private firestore: Firestore) { }

  getNextMatch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'fc909ed743b1f2049781e53977c8c5b5' // aquí agregamos el token
      })
    };
    let params = new HttpParams();
    params = params.append('league', 262);
    params = params.append('season', 2022);
    params = params.append('status', 'NS');
    return this.http.get<any>(this.apiUrl + `fixtures?league=${262}&season=${2022}&status=${'NS'}`, httpOptions)
      .pipe();
  }
  loginwithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  //GUARDADO 
  agregarQui(obj: any) {
    const quiniela = collection(this.firestore, 'Guardado');
    return addDoc(quiniela, obj);
  }

  obtenerResultados(): Observable<any[]> {
    const quiniela = collection(this.firestore, 'Guardado');
    return collectionData(quiniela, {idField: 'id'}) as Observable<any[]>
  }

  borrarResultados(id: any){
    const quiniela = doc(this.firestore, `Guardado/${id}`);
    return deleteDoc(quiniela);

  }


}

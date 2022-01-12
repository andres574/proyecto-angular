import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) {
  
    
  }
  agregarGrado(grados: any): Promise<any>{
      return this.firestore.collection('grados').add(grados);

  }
  // obtener datos para table
  getGrado():  Observable<any> {
    return this.firestore.collection('grados').snapshotChanges();
  }
  
eliminarGrado(id: string): Promise<any>{
  return this.firestore.collection('grados').doc(id).delete();
  }
  // obtener datos para editar
  getGrados(id:string):Observable<any> {
    return this.firestore.collection('grados').doc(id).snapshotChanges();
  }
  actualizarempleado(id:string, data: any): Promise<any> {
    return this.firestore.collection('grados').doc(id).update(data);
  }
}



import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private firestore: AngularFirestore) {
  
    
  }
  AgregarProfesor(profesores: any): Promise<any>{
      return this.firestore.collection('profesores').add(profesores);

  }
  // obtener datos para table
  getProfesores():  Observable<any> {
    return this.firestore.collection('profesores').snapshotChanges();
  }
  
eliminarProfesor(id: string): Promise<any>{
  return this.firestore.collection('profesores').doc(id).delete();
  }
  // obtener datos para editar
  getProfesor(id:string):Observable<any> {
    return this.firestore.collection('profesores').doc(id).snapshotChanges();
  }
  actualizarProfesor(id:string, data: any): Promise<any> {
    return this.firestore.collection('profesores').doc(id).update(data);
  }
}



import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UsuarioModel } from '../../models/usuario.intenface';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userColletion: AngularFirestoreCollection<UsuarioModel>;
  public emailRevi = '';

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.leerToken();
    this.userColletion = db.collection('users');

    
  }
  userToken: string

  /* 
   -> Metodo para iniciar sesion
  */
  async onLogin(email: string, password: string) {
    // console.log(email, password);
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (result != null) {
        const token = result.user!.refreshToken;
        this.guardarToken(token);
      }
      return result;
    } catch (e) {
      console.log(e);
      return e
      
    }
  }

  /* 
   -> Metodo para cerrar sesion
  */
  async onLogout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /* 
   -> Metodo para registrar usuario
  */

  async onRegister(email: string, password: string, nombre: string ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      result.user!.updateProfile({
        displayName : nombre
      });

      if (result != null) {
        const token = result.user!.refreshToken;
        this.guardarToken(token);
      }
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

 async onRegisterDB(UsuarioModel : UsuarioModel ){
     try {
       const id = this.db.createId();
       UsuarioModel.status = true;
       const user = {id, ...UsuarioModel}
      await this.userColletion.doc(id).set(user);

      return true;
       
     } catch (error) {
       return false;
     }
  }

  /* 
   -> Metodo para cambiar el password 
  */

  async password_Change(email: string): Promise<void> {
    try {
      //validacion en la bd si existe antes de este metodo
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  /* 
   -> Metodo para obtener la info del usuario
  */

  async getCurrentUser() {
    try {
      return await this.afAuth.authState.pipe(first()).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /* 
   -> Metodo para guardar el token de inicio de sesion, 1 hora caduca
  */
  guardarToken(idToken: string): void {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  /* 
    -> Metodo para leer el token guardado en localstorage
   */

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')!;
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  /* 
   -> Metodo para saber el estado del inicio de sesion
  */

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  async getUserLogin( email : string ){
    try {
      const rEmail = await this.userColletion.ref.where('email', '==', email).get();
      return rEmail.docs.map(resp => {
        return resp.data();
      })[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

    async getdatos(){
      try {
        const email = this.emailRevi
      const rEmail = await this.userColletion.ref.where('email', '==', email).get();
      return rEmail.docs.map(resp => {
        return resp.data();
      })[0];
    } catch (error) {
      console.log(error);
      return null;
    }
    }
  

  
  
  
  async obteniendo(email: string) {
    this.emailRevi = email;
    // console.log(dato1);
    // return dato1;
  }

  

  // async deleteAccout(){
  // //  this.afAuth.
  // }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesoresService } from 'src/app/shared/services/data/profesores.service';

@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.scss']
})
export class ListaProfesorComponent implements OnInit {
  profesores: any[] = [];
  constructor(private _profesorService: ProfesoresService, private toastr: ToastrService ) { }
  ngOnInit(): void {
    this.getProfesor();
  }

  getProfesor() {
    this._profesorService.getProfesores().subscribe(data => {
      this.profesores = [];
      data.forEach((element:any)=> {
        // console.log(element.payload.doc.data());
        this.profesores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        console.log(this.profesores)
      });
    })
  }

    eliminarProfesor(id:string) {
    this._profesorService.eliminarProfesor(id).then(() => {
      console.log('Profesor eliminado');
      this.toastr.error('Profesor eliminado con exito', "Profesor eliminado", { positionClass: 'toast-bottom-right' })

    }).catch(error => {
      console.log(error);
    })
  }



}

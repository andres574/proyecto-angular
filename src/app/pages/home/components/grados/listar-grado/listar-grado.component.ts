import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data/data.service';


@Component({
  selector: 'app-listar-grado',
  templateUrl: './listar-grado.component.html',
  styleUrls: ['./listar-grado.component.scss']
})
export class ListarGradoComponent implements OnInit {
  grados: any[] = [];
  constructor(private _gradoService: DataService,private toastr: ToastrService) {
  
  }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos() {
    this._gradoService.getGrado().subscribe(data => {
      this.grados = [];
      data.forEach((element:any)=> {
        // console.log(element.payload.doc.data());
        this.grados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        console.log(this.grados)
      });
    })
  }

  eliminarGrado(id:string) {
    this._gradoService.eliminarGrado(id).then(() => {
      console.log('empleado eliminado');
      this.toastr.error('Grado eliminado con exito', "Grado eliminado", { positionClass: 'toast-bottom-right' })

    }).catch(error => {
      console.log(error);
    })
  }
}

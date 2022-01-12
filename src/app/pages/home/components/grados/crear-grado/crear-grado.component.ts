import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-crear-grado',
  templateUrl: './crear-grado.component.html',
  styleUrls: ['./crear-grado.component.scss']
})
export class CrearGradoComponent implements OnInit {

  crearGrados: FormGroup;
  sumitted = false;


  loading = false;
  id: string | null;
  titulo = 'Agregar Grado';
  acceso = '../listaGrado';
  boton = "Agregar"

  
  constructor(private fb: FormBuilder, private _gradoervice: DataService, private ruta: Router,
    private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.crearGrados = this.fb.group({
      nombre: ['', Validators.required, ],
      compartido: ['', Validators.required]
     
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
      // const disableSelect = new FormControl(false);
  }


  
  

  ngOnInit(): void {
    this.tomandoDatos();
  }
  
  agregarEditarGrado() {
    this.sumitted = true;
    if (this.crearGrados.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregargrado()
      
    } else {

      this.acceso = '../../listaGrado',
      

      this.editGrado(this.id);
    }

    
  
  }

  agregargrado() {
    const grado: any = {
      nombre: this.crearGrados.value.nombre,
      compartido: this.crearGrados.value.compartido
    }
    this.loading = true;
    this._gradoervice.agregarGrado(grado).then(() =>
    {
      this.toastr.success("grado registrado con exito!", "Grado Registrado", { positionClass: 'toast-bottom-right' });
      this.loading = false;
      this.ruta.navigate(['/home/listaGrado'])
    }).catch(error => {
      console.log(error);
    })
  }
  editGrado(id: string) {
    
     const grado: any = {
      nombre: this.crearGrados.value.nombre,
      compartido: this.crearGrados.value.compartido
     }
    this.loading = true;

    this._gradoervice.actualizarempleado(id, grado).then(() => {
     
      this.toastr.info('El grado fue modificado con exito', 'Grado modificado'),{ positionClass: 'toast-bottom-right' };
      
    })
     this.ruta.navigate(['/home/listaGrado'])
}


  tomandoDatos() {
    // this.titulo = 'Editar grado'
    if (this.id !== null) {
      this.titulo = 'Editar Grado';
      this.boton = "Actualizar"

      this._gradoervice.getGrados(this.id).subscribe(data => {

        // console.log(data.payload.data()['nombre']);
        this.crearGrados.setValue({
          nombre: data.payload.data()['nombre'],
          compartido: data.payload.data()['compartido'],


        })
      })
  }
  
}
  
}

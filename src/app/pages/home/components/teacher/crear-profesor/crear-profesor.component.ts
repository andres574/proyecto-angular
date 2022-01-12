import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfesoresService } from 'src/app/shared/services/data/profesores.service';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.scss']
})
export class CrearProfesorComponent implements OnInit {

  crearProfesor: FormGroup;
  sumitted = false;

    loading = false;
  id: string | null;
  titulo = 'Agregar Profesor';
  acceso = '../teacher';
  boton = "Agregar";

  constructor(private fb: FormBuilder, private _profesorService: ProfesoresService, private ruta: Router,
    private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.crearProfesor = this.fb.group({
      nombreApellido: ['', Validators.required],
      documento: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['',Validators.required]
    })
        this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.tomandoDatos();
  }

   agregarEditarProfesor() {
    this.sumitted = true;
    if (this.crearProfesor.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarProfesor()
      
    } else {

      this.acceso = '../../teacher',
      

      this.editProfesor(this.id);
    }   
  
   }
  
  agregarProfesor() {
    const profesor: any = {
      nombreApellido: this.crearProfesor.value.nombreApellido,
      documento: this.crearProfesor.value.documento,
      genero: this.crearProfesor.value.genero,
      correo: this.crearProfesor.value.correo,
      telefono: this.crearProfesor.value.telefono,
    }
    this.loading = true;
    this._profesorService.AgregarProfesor(profesor).then(() =>
    {
      this.toastr.success("Profesor registrado con exito!", "Profesor Registrado", { positionClass: 'toast-bottom-right' });
      this.loading = false;
      this.ruta.navigate(['/home/teacher'])
    }).catch(error => {
      console.log(error);
    })
  }

    editProfesor(id: string) {
    
     const profesor: any = {
      nombreApellido: this.crearProfesor.value.nombreApellido,
      documento: this.crearProfesor.value.documento,
      genero: this.crearProfesor.value.genero,
      correo: this.crearProfesor.value.correo,
      telefono: this.crearProfesor.value.telefono,
    }
      this.loading = true;
      
      // console.log(profesor);

    this._profesorService.actualizarProfesor(id, profesor).then(() => {
     
      this.toastr.info('Profesor fue modificado con exito', 'Profesor modificado'),{ positionClass: 'toast-bottom-right' };
      
    })
     this.ruta.navigate(['/home/teacher'])
    }
    tomandoDatos() {
    // this.titulo = 'Editar grado'
    if (this.id !== null) {
      this.titulo = 'Editar profesor';
      this.boton = "Actualizar"

      this._profesorService.getProfesor(this.id).subscribe(data => {

        // console.log(data.payload.data()['nombre']);
        this.crearProfesor.setValue({
          nombreApellido: data.payload.data()['nombreApellido'],
          documento: data.payload.data()['documento'],
          genero: data.payload.data()['genero'],
          correo: data.payload.data()['correo'],
          telefono: data.payload.data()['telefono'],

        })
      })
  }
  
}

}

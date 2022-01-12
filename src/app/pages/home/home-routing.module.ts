import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { StudentComponent } from './components/student/student.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ListarGradoComponent } from './components/grados/listar-grado/listar-grado.component';
import { CrearGradoComponent } from './components/grados/crear-grado/crear-grado.component';
import { ListaProfesorComponent } from './components/teacher/lista-profesor/lista-profesor.component';
import { CrearProfesorComponent } from './components/teacher/crear-profesor/crear-profesor.component';
// import { AuthService } from 'src/app/shared/services/auth/auth.service';

 const role = '';
const routes: Routes = [
  { path: '', redirectTo: '' },
  {
    path: '',
    component: HomeComponent,
    children: [
       { path: 'pagina1', component: Pagina1Component },
       { path: 'student', component: StudentComponent },
      { path: 'teacher', component: ListaProfesorComponent },
      { path: 'teacherCrear', component: CrearProfesorComponent },
      { path: 'teacherEditar/:id', component: CrearProfesorComponent },
      { path: 'config', component: ConfiguracionComponent },
      { path: 'listaGrado', component: ListarGradoComponent },
      { path: 'crearGrado', component: CrearGradoComponent },
      { path: 'editGrado/:id', component: CrearGradoComponent },

      // { path: '**', redirectTo: 'pagina1',pathMatch:'full' },
     
     { path: '', redirectTo: 'pagina1' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

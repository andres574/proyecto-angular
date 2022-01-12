import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { HomeComponent } from './home.component';
import { StudentComponent } from './components/student/student.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
 import { ListarGradoComponent } from './components/grados/listar-grado/listar-grado.component';
import { CrearGradoComponent } from './components/grados/crear-grado/crear-grado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ListaProfesorComponent } from './components/teacher/lista-profesor/lista-profesor.component';
import { CrearProfesorComponent } from './components/teacher/crear-profesor/crear-profesor.component';










@NgModule({
  declarations: [
    HomeComponent,
    Pagina1Component,
    StudentComponent,
    CrearProfesorComponent,
    ListaProfesorComponent,
    ConfiguracionComponent,
    NavbarComponent,
    ListarGradoComponent,
    CrearGradoComponent,
    SidebarComponent,
    ListaProfesorComponent,
    CrearProfesorComponent,
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
       MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule
  
    
  ]
})
export class HomeModule { }

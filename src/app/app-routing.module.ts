import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { TablasComponent } from './componentes/tablas/tablas.component';
import { CrearTablasComponent } from './componentes/tablas/crear-tablas/crear-tablas.component';
import { VisualizarTablasComponent } from './componentes/tablas/visualizar-tablas/visualizar-tablas.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './componentes/usuarios/crear-usuario/crear-usuario.component';
import { DatosUsuarioComponent } from './componentes/usuarios/datos-usuario/datos-usuario.component';
import { EjerciciosComponent } from './componentes/ejercicios/ejercicios.component';
import { DietasComponent } from './componentes/dietas/dietas.component';
import { SeguimientoComponent } from './componentes/seguimiento/seguimiento.component';
import { ClasesComponent } from './componentes/clases/clases.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'tablas',
    children: [
      {
        path: '',
        component: TablasComponent,
      },
      {
        path: 'crear/:idUsuario',
        component: CrearTablasComponent,
      },
      {
        path: 'visualizar/:idTabla',
        component: VisualizarTablasComponent,
      }
    ]
  },
  {
    path: 'ejercicios',
    children: [
      {
        path: '',
        component: EjerciciosComponent,
      },
    ]
  },
  {
    path: 'dietas',
    children: [
      {
        path: '',
        component: DietasComponent,
      },
    ]
  },
  {
    path: 'seguimiento',
    children: [
      {
        path: '',
        component: SeguimientoComponent,
      },
    ]
  },
  {
    path: 'clases',
    children: [
      {
        path: '',
        component: ClasesComponent,
      },
    ]
  },
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        component: UsuariosComponent,
      },
      {
        path: 'crearUsuario',
        component: CrearUsuarioComponent,
      },
      {
        path: 'datosUsuario/:idUsuario',
        component: DatosUsuarioComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

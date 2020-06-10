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
import { VisualizarEjerciciosComponent } from './componentes/ejercicios/visualizar-ejercicios/visualizar-ejercicios.component';
import { DetallesEjercicioComponent } from './componentes/ejercicios/visualizar-ejercicios/detalles-ejercicio/detalles-ejercicio.component';
import { CrearEjerciciosComponent } from './componentes/ejercicios/crear-ejercicios/crear-ejercicios.component';
import { CrearDietasComponent } from './componentes/dietas/crear-dietas/crear-dietas.component';
import { VisualizarDietasComponent } from './componentes/dietas/visualizar-dietas/visualizar-dietas.component';
import { AdministrarClasesComponent } from './componentes/clases/administrar-clases/administrar-clases.component';


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
      {
        path: 'crear',
        component: CrearEjerciciosComponent,
      },
      {
        path: 'visualizar-ejercicios/:zona',
        children: [
          {
            path: '',
            component: VisualizarEjerciciosComponent,
          },
          {
            path: 'detalles-ejercicio/:idEjercicio',
            component: DetallesEjercicioComponent,
          }
        ]
      }
    ]
  },
  {
    path: 'dietas',
    children: [
      {
        path: '',
        component: DietasComponent,
      },
      {
        path: 'crear/:idUsuario',
        component: CrearDietasComponent,
      },
      {
        path: 'visualizar/:idDieta',
        component: VisualizarDietasComponent,
      }
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
      {
        path: 'administrar-clases',
        component: AdministrarClasesComponent,
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

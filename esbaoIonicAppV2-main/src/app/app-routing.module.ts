import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'agregar-alumno',
    loadChildren: () => import('./agregar-alumno/agregar-alumno.module').then( m => m.AgregarAlumnoPageModule)
  },
  {
    path: 'listar-alumno',
    loadChildren: () => import('./listar-alumno/listar-alumno.module').then( m => m.ListarAlumnoPageModule)
  },
  
  {
    path: 'levantar-bitacora',
    loadChildren: () => import('./levantar-bitacora/levantar-bitacora.module').then( m => m.LevantarBitacoraPageModule)
  },
  {
    path: 'levantar-tutor',
    loadChildren: () => import('./levantar-tutor/levantar-tutor.module').then( m => m.LevantarTutorPageModule)
  },
  {
    path: 'levantar-citatorio',
    loadChildren: () => import('./levantar-citatorio/levantar-citatorio.module').then( m => m.LevantarCitatorioPageModule)
  },
  {
    path: 'listar-citatorio',
    loadChildren: () => import('./listar-citatorio/listar-citatorio.module').then( m => m.ListarCitatorioPageModule)
  },
  {
    path: 'listar-bitacora',
    loadChildren: () => import('./listar-bitacora/listar-bitacora.module').then( m => m.ListarBitacoraPageModule)
  },
  {
    path: 'editar-bitacora/:id',
    loadChildren: () => import('./editar-bitacora/editar-bitacora.module').then( m => m.EditarBitacoraPageModule)
  },
  {
    path: 'editar-citatorio/:id',
    loadChildren: () => import('./editar-citatorio/editar-citatorio.module').then( m => m.EditarCitatorioPageModule)
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

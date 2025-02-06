import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent }, // Página principal
  { path: 'home', component: MovieListComponent }, // Redundante pero útil para navegación
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirigir cualquier ruta desconocida al home
];

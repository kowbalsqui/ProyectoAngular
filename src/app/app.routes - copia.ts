// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';

export const routes: Routes = [ // Añade 'export' aquí
  { path: '', component: MovieListComponent },
  { path: 'home', component: MovieListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

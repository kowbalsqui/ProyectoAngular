// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';

export const routes: Routes = [ // Añade 'export' aquí
  { path: '', component: MovieListComponent },
  { path: 'home', component: MovieListComponent },
  { path: 'actor/:id', component: ActorListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

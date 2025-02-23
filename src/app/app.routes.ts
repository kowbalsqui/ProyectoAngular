// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthComponent } from './components/auth/auth.component'
import { FavoritosComponent } from './components/favoritos/favoritos.component'

export const routes: Routes = [ // Añade 'export' aquí
  { path: '', component: MovieListComponent },
  { path: 'home', component: MovieListComponent },
  { path: 'actor/:id', component: ActorListComponent },
  { path: 'peli/:id', component: MovieInfoComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

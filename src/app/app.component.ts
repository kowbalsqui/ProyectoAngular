// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TmdbService } from './services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';  // Asegúrate de importar tu componente de Navbar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MovieListComponent,
    FormsModule,
    RouterOutlet,
    NavbarComponent  // Asegúrate de agregar el NavbarComponent en los imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  movies: any;

  constructor(private tmdbService: TmdbService) {}

  private fetchMovies(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }
}

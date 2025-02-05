import { Component } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from './services/tmdb.service'; // Import the TmdbService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MovieListComponent], // Importa el componente MovieListComponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  movies: any

  constructor(private tmdbService: TmdbService) {}

  private fetchMovies(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
  });

}
}

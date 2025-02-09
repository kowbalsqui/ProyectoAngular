import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  allMovies: any[] = []; // Guarda todas las películas originales
  terminoBusqueda: string = '';

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.fetchMovies(); // Llama a fetchMovies() solo una vez aquí
  }

  fetchMovies(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  buscarPelicula(termino: string): void {
    if (termino.trim() === '') {
      this.fetchMovies(); // Si el término de búsqueda está vacío, cargamos las películas populares
    } else {
      this.tmdbService.searchMovies(termino).subscribe((data: any) => {
        this.movies = data.results; // Actualiza la lista de películas con los resultados de la búsqueda
      });
    }
  }
}

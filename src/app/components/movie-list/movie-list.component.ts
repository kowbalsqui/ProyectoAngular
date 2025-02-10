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
  movies: any[] = []; // Lista de películas populares
  filteredMovies: any[] = []; // Lista filtrada por búsqueda
  topMovies: any[] = []; // Películas para el carrusel
  actors: any[] = []; // Lista de actores encontrados
  terminoBusqueda: string = '';

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results || []; 
      this.filteredMovies = [...this.movies]; 
      this.topMovies = this.movies.slice(0, 3); // ✅ Selecciona las 3 primeras películas para el carrusel
    });
  }

  buscarPelicula(termino: string): void {
    if (termino.trim() === '') {
      this.filteredMovies = [...this.movies]; 
      this.actors = [];
      return;
    }

    // 🔍 Buscar películas
    this.tmdbService.searchMovies(termino).subscribe((data: any) => {
      this.filteredMovies = data.results || [];
    });

    // 🎭 Buscar actores
    this.tmdbService.searchActors(termino).subscribe((data: any) => {
      this.actors = data.results || [];
    });
  }

  getActorMovies(actorId: number): void {
    this.tmdbService.getActorMovies(actorId).subscribe((data: any) => {
      this.filteredMovies = data.cast || [];
    });
  }
}

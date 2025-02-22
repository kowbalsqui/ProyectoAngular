import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; // Lista de películas populares
  filteredMovies: any[] = []; // Lista filtrada por búsqueda
  topMovies: any[] = []; // Películas para el carrusel
  actors: any[] = []; // Lista de actores encontrados
  terminoBusqueda: string = '';
  ordenSeleccionado: string = ''; // Almacena el orden seleccionado

  constructor(private tmdbService: TmdbService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  // ✅ Carga las películas populares al iniciar
  fetchMovies(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results || [];
      this.filteredMovies = [...this.movies];
      this.topMovies = this.movies.slice(0, 3); // ✅ Selecciona las 3 primeras películas para el carrusel
    });
  }

  // 🔍 **Buscar películas en la API**
  buscarPelicula(termino: string): void {
    this.terminoBusqueda = termino.trim();

    if (this.terminoBusqueda === '') {
      this.filteredMovies = [...this.movies]; // Volver a mostrar las películas populares
      this.actors = [];
      return;
    }

    // ✅ Llamar a la API para buscar películas
    this.tmdbService.searchMovies(this.terminoBusqueda).subscribe((data: any) => {
      this.filteredMovies = data.results || [];
      this.ordenarPeliculas(); // Aplicar orden alfabético si se ha seleccionado
    });

    // 🎭 Buscar actores en la API
    this.tmdbService.searchActors(this.terminoBusqueda).subscribe((data: any) => {
      this.actors = data.results || [];
    });
  }

  // 🔄 **Ordenar películas alfabéticamente**
  ordenarPeliculas(): void {
    if (this.ordenSeleccionado === "asc") {
      this.filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.ordenSeleccionado === "desc") {
      this.filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  // ✅ Método para alternar entre añadir y quitar de favoritos
  toggleFavorito(movie: any): void {
    if (this.esFavorito(movie.id)) {
      this.authService.removeFavorito(movie.id);
    } else {
      this.authService.addFavorito(movie);
    }
  }

  // ✅ Verifica si una película ya está en favoritos
  esFavorito(movieId: string): boolean {
    return this.authService.getFavoritos().some(fav => fav.id === movieId);
  }
}

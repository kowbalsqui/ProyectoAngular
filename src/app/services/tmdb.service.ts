import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = '42eb81be4905a643d9ae9ae6fe4f878c'; // ⚠️ Reemplaza con tu API Key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // ✅ Obtener películas populares
  getPopularMovies(): Observable<any> {

    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  // ✅ Buscar películas por título
  searchMovies(query: string): Observable<any> {
    let movies: any[] = [];

    this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`).subscribe((data: any) => {
      movies = data.results
      
      console.log("arriba"); 
      console.log(movies);
      console.log("abajo"); 
    });

    console.log(movies)
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  // ✅ Obtener detalles de una película por ID
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }

  // ✅ **Buscar actores por nombre**
  searchActors(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/person?api_key=${this.apiKey}&query=${query}`);
  }

  // ✅ **Obtener películas en las que aparece un actor**
  getActorMovies(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}/movie_credits?api_key=${this.apiKey}`);
  }

  // ✅ Obtener detalles de un actor (nombre, biografía, imagen, etc.)
  getActorDetails(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}?api_key=${this.apiKey}&language=es-ES`);
  }

  getActorMoviesFromMovie(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`)
    .pipe(
      map(response => response.cast)
    );
  }

}

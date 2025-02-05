import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '42eb81be4905a643d9ae9ae6fe4f878c'; // Reemplaza con tu clave de API de TMDb
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.baseUrl}/movie/popular`, { params });
  }

  searchMovies(query: string): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get(`${this.baseUrl}/search/movie`, { params });
  }
}

import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.css'
})
export class MovieInfoComponent implements OnInit{
  movieId!: any;
  movie!: any; 
  actors: any[] = [];
  actorid!: number; 
  actor!: any; 

  constructor (private route: ActivatedRoute, private tmdbService: TmdbService){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(param =>{
      this.movieId = Number(param.get('id'));
      this.fectahMovieDetails();
      console.log("Pelicula");
      console.log(this.movie);
      console.log("id de la pelicula");
      console.log(this.movieId);
      console.log("Actores");
      console.log(this.actors);
    });
  }

  fectahMovieDetails(): void{
    this.tmdbService.getMovieDetails(this.movieId).subscribe(data =>{
      this.movie = data;
    });
    this.tmdbService.getActorMoviesFromMovie(this.movieId).subscribe(
      (data) => {
        console.log('Lista de actores:', data);
        this.actors = data; 
      },
      (error) => console.error('Error al obtener los actores:', error)
    );
    this.tmdbService.getActorDetails(this.actorid).subscribe(data => {
      this.actor = data;
    }); 
  }
}

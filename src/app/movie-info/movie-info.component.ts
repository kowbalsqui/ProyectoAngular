import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  imports: [MovieInfoComponent, CommonModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.css'
})
export class MovieInfoComponent {
  movies = Array<any>;
  movieId!: any;
  peli!: any; 

  constructor (private route: ActivatedRoute, private tmdbService: TmdbService){}

  ngOnInit(): void{
    this.route.paramMap.suscribe(param =>{
      this.moviesId = Number(param.get('id'));

    })
  }
}

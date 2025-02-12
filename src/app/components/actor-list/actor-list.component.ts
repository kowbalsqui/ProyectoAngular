import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit {
  actorId!: number;
  actor!: any;
  actorMovies: any[] = [];

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actorId = Number(params.get('id')); // 🔥 Obtiene el ID del actor de la URL
      this.fetchActorDetails();
    });
  }

  fetchActorDetails(): void {
    this.tmdbService.getActorDetails(this.actorId).subscribe(data => {
      this.actor = data; 
    });

    this.tmdbService.getActorMovies(this.actorId).subscribe(data => {
      this.actorMovies = data.cast || []; 
    });
  }
}

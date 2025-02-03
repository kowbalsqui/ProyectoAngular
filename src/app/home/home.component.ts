import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../servicios/marvel.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  characters: any;

  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.marvelService.getCharacters().subscribe(
      (data: any) => {
        this.characters = data.data.results;
      },
      (error) => {
        console.error('Error al obtener los personajes', error);
      }
    );
  }
}

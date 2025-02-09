import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true, // <-- Si es standalone, agrégalo
  imports: [FormsModule, CommonModule], // <-- Añade FormsModule aquí
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  terminoBusqueda: string = '';

  @Output() onBuscarPelicula: EventEmitter<string> = new EventEmitter();

  buscarPelicula(event: Event) {
    event.preventDefault(); // Evita la recarga de la página
    this.onBuscarPelicula.emit(this.terminoBusqueda);
  }
}

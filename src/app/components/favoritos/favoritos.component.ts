import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, FormsModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  // ✅ Cargar las películas favoritas
  private loadFavoritos() {
    this.favoritos = this.authService.getFavoritos();
    console.log("🎬 Películas favoritas cargadas:", this.favoritos);
  }

  // ✅ Eliminar una película de favoritos
  eliminarFavorito(peliculaId: string) {
    this.authService.removeFavorito(peliculaId);
    this.loadFavoritos(); // 🔥 Recargar la lista después de eliminar
  }
}

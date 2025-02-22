import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: { email: string, password: string, favoritos: any[] }[] = [];
  private usuarioActual: string | null = null;

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const usuariosGuardados = localStorage.getItem('usuarios');
      if (usuariosGuardados) {
        this.usuarios = JSON.parse(usuariosGuardados);
      }
      this.usuarioActual = localStorage.getItem('usuarioActual');
    }
  }

  // ✅ Registrar usuario
  register(email: string, password: string): boolean {
    const usuarioExiste = this.usuarios.some(user => user.email === email);

    if (usuarioExiste) {
      return false;
    }

    this.usuarios.push({ email, password, favoritos: [] });
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    window.location.reload(); 
    return true;
  }

  // ✅ Iniciar sesión
  login(email: string, password: string): boolean {
    const usuarioValido = this.usuarios.find(user => user.email === email && user.password === password);
    
    if (usuarioValido) {
      this.usuarioActual = email;
      localStorage.setItem('usuarioActual', email);
      window.location.reload(); 
      return true;
    }
    return false;
  }

  // ✅ Obtener usuario actual
  getUsuarioActual(): string | null {
    return this.usuarioActual;
  }

  // ✅ Cerrar sesión
  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }

  // ✅ Agregar película a favoritos y guardar en localStorage
  addFavorito(movie: any) {
    if (!this.usuarioActual) {
      console.error("⚠️ No hay usuario logueado.");
      return;
    }

    const usuario = this.usuarios.find(user => user.email === this.usuarioActual);
    if (!usuario) return;

    if (!usuario.favoritos) {
      usuario.favoritos = [];
    }

    // ✅ Verificar si la película ya está en favoritos antes de agregarla
    const existe = usuario.favoritos.some(fav => fav.id === movie.id);
    if (!existe) {
      usuario.favoritos.push(movie);
      console.log("✅ Película añadida a favoritos:", movie);
      this.guardarUsuarios(); // Guardar en localStorage
    } else {
      console.warn("⚠️ La película ya está en favoritos.");
    }
  }

  // ✅ Obtener películas favoritas del usuario logueado
  getFavoritos(): any[] {
    if (!this.usuarioActual) return [];

    const usuario = this.usuarios.find(user => user.email === this.usuarioActual);
    return usuario ? usuario.favoritos || [] : [];
  }

  // ✅ Eliminar película de favoritos y actualizar localStorage
  removeFavorito(peliculaId: string): void {
    if (!this.usuarioActual) return;

    const usuario = this.usuarios.find(user => user.email === this.usuarioActual);
    if (usuario && usuario.favoritos) {
      usuario.favoritos = usuario.favoritos.filter(fav => fav.id !== peliculaId);
      this.guardarUsuarios(); // Guardar cambios en localStorage
      console.log("❌ Película eliminada de favoritos:", peliculaId);
    }
  }

  // ✅ Guardar la lista de usuarios en `localStorage`
  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
}

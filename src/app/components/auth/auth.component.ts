import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email = '';
  password = '';
  isRegistering = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  authenticate() {
    this.errorMessage = null;

    if (this.isRegistering) {
      const registrado = this.authService.register(this.email, this.password);
      if (registrado) {
        alert('✅ Usuario registrado con éxito');
        this.isRegistering = false; // Cambiar a modo login
      } else {
        this.errorMessage = "❌ El usuario ya existe.";
      }
    } else {
      const loggedIn = this.authService.login(this.email, this.password);
      if (loggedIn) {
        alert('✅ Sesión iniciada correctamente');
        this.router.navigate(['/']); // Redirige a la página principal
      } else {
        this.errorMessage = "❌ Usuario o contraseña incorrectos.";
      }
    }
  }
}

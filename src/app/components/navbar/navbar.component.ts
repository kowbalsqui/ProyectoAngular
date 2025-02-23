import { Component, EventEmitter, Output, OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterModule, RouterLink], // <-- Añade FormsModule aquí
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef // 🔥 Detecta cambios manualmente
  ) {}

  ngOnInit(): void {
    this.verificarUsuario();
  }

  verificarUsuario(): void {
    this.userEmail = this.authService.getUsuarioActual();
    this.isLoggedIn = !!this.userEmail;
    this.cdRef.detectChanges(); // 🔥 Forzar actualización
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userEmail = null;
    this.cdRef.detectChanges(); // 🔥 Forzar actualización
    
     // Redirige a Login
  }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterModule], // <-- Añade FormsModule aquí
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}

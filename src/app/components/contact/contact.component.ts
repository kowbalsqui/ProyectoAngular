import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true, // 🔥 Indica que es un componente independiente
  imports: [CommonModule, ReactiveFormsModule], // ✅ Importamos ReactiveFormsModule aquí
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarCorreo() {
    if (this.contactForm.valid) {
      this.emailService.enviarCorreo(this.contactForm.value).then(
        response => {
          console.log('✅ Correo enviado:', response);
          alert('Correo enviado con éxito.');
          this.contactForm.reset();
        },
        error => {
          console.error('❌ Error al enviar correo:', error);
          alert('Error al enviar el correo. Intenta de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
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

  // 📧 Método para abrir el cliente de correo con `mailto:`
  abrirCorreo() {
    if (this.contactForm.valid) {
      const nombre = encodeURIComponent(this.contactForm.value.nombre);
      const email = encodeURIComponent(this.contactForm.value.email);
      const mensaje = encodeURIComponent(this.contactForm.value.mensaje);

      console.log("abriendo")

      const mailtoLink = `mailto:pepefolson@gmail.com?subject=Consulta de ${nombre}&body=Nombre: ${nombre}%0D%0ACorreo: ${email}%0D%0AMensaje: ${mensaje}`;

      window.location.href = mailtoLink; // 🔥 Esto abrirá el cliente de correo con los datos rellenados
    }
  }

  // 📩 Enviar correo con EmailJS
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

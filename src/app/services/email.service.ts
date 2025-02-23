import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_3p5n9hr'; // 🔥 Reemplaza con tu Service ID de EmailJS
  private templateId = 'template_m1057ze'; // 🔥 Reemplaza con tu Template ID de EmailJS
  private publicKey = 'rROkQSfC1w4XEGBMQ'; // 🔥 Reemplaza con tu Public Key de EmailJS

  constructor() {}

  enviarCorreo(formData: any): Promise<any> {
    return emailjs.send(this.serviceId, this.templateId, formData, this.publicKey);
  }
}

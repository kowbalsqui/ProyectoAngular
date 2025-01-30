import { Component } from '@angular/core';
import { Alumnado } from './alumnado'

@Component({
  selector: 'app-alumnado-daw',
  imports: [],
  templateUrl: './alumnado-daw.component.html',
  styleUrl: './alumnado-daw.component.css'
})
export class AlumnadoDAWComponent {
  public daw: Alumnado[] = [];
  public primero : boolean;

  constructor() {
    this.daw = [
      new Alumnado('Álvaro', 'Soria', '222Z', '10-2-15', 'Sevilla', 444, 'primero', ['AOFI', 'SOR', 'EMP']),
      new Alumnado('Francisco', 'Díaz', '222Z', '10-2-15', 'Sevilla', 444, 'primero', ['AOFI', 'SOR', 'EMP']),
      new Alumnado('Carlos', 'González', '222Z', '10-2-15', 'Sevilla', 444, 'segundo', ['DWI', 'DAW', 'DWC']),
      new Alumnado('Javier', 'Pérez', '222Z', '10-2-15', 'Sevilla', 444, 'segundo', ['DWI', 'DAW', 'DWC']),
    ];
    this.primero = true; 
  }

  changePrimero (valor:boolean){
    this.primero = valor;
  }
}

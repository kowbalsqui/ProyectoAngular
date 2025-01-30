import { Component } from '@angular/core';
import { Empleado } from './empleado'

@Component({
  selector: 'app-empleado',
  imports: [],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})

export class EmpleadoComponent {
  public title = "Bienvenido Empleado";
  public empleadoExt: Empleado; 
  public trabajadores: Array<Empleado>;
  public trabajadorExterno: boolean; 

  constructor(){
    this.empleadoExt = new Empleado ("Pedro", 47, "Gerente", true);
    this.trabajadores = [
      new Empleado ("Marta", 27, "Actor", true),
      new Empleado ("Alejandro", 20, "Administracion", true),
      new Empleado ("Rab", 19, "Aprendiz", false)
    ]
    this.trabajadorExterno=true;
  }

  ngOnInit(){
    console.log(this.empleadoExt);
  }

  cambiarExterno(valor:boolean){
    this.trabajadorExterno = valor; 
  }
}

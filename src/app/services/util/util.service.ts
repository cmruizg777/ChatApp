import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  public validarUser(user: User){
    const errores = [];
    if(!this.validarEmail(user.email)){
      errores.push('Email no valido');
    }
    if(!this.validarContrasena(user.password)){
      errores.push('Contraseña no válido, Debe contener al menos 8 caracteres y al menos: un caracteres especial, una letra mayúscula, una letra minúscula, un digito');
    }
    if(user.password !== user.confirmPassword){
      errores.push('Las contraseñas no coinciden');
    }
    if(user.nombres.trim()===''){
      errores.push('Nombre no valido');
    }
    if(user.apellidos.trim()===''){
      errores.push('Apellido no válido.');
    }
    return errores;
  }
  public validarEmail(email: any) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  public validarContrasena(pass: any) {
    const regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    return regex.test(pass);
    }
}

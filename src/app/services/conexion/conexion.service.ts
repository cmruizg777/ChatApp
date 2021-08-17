
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConexionService{

  constructor(private api: ApiService){

  }
  verConexion(idConexion){
    if(idConexion!==''){
      return this.api.get('Conexion/VerConexion?Id='+idConexion );
    }
    return null;
  }
  guardarConexion(idConexion){
    if(idConexion!==''){
      return this.api.post('Conexion/Nueva',{id: idConexion});
    }
    return null;
  }
  borrarConexion(idConexion){
    if(idConexion!==''){
      return this.api.delete('Conexion/Borrar?Id='+idConexion );
    }
    return null;
  }
  getIdConexion(){
    return localStorage.getItem('connectionId');
  }

}

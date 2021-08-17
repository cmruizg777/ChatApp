import { NewMessage } from './../../model/new-message';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(
    private api: ApiService
  ) { }
  listarMensajes(idUser){
    return this.api.get('Mensaje/Listar?Id='+idUser);
  }
  enviarMensaje(newMessage: NewMessage){
    return this.api.post('Mensaje/Enviar', newMessage);
  }
}

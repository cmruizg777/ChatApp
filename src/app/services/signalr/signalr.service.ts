import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConexionService } from '../conexion/conexion.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: HubConnection;
  $newMessage = new Subject<any>();
  constructor(
    private conexionService: ConexionService
  ) {
    this.connection = new HubConnectionBuilder().withUrl('https://localhost:44344/chatHub').build();
  }
  startConnection(){
    this.connection.start().then(()=>{
      const connectionId = this.connection.connectionId;
      this.connection.on('ReceiveMessage',
      (data)=>{
        this.$newMessage.next(data);
      });
      return connectionId;
      //this.connection.on('SendMessage', this.onSendMessage);
    }).then(connectionId=>{
      console.log('##############################################');
      console.log('CONEXION REALIZA CON EXITO ID: ',connectionId);
      console.log('##############################################');
      localStorage.setItem('connectionId', connectionId);
      return this.conexionService.guardarConexion(connectionId).toPromise();
    }).then( resp =>{
      console.log(resp);
    })
    .catch((reason)=>{
      console.log(reason);
    });
  }
  async closeConnection(){
    await this.connection.stop();
    localStorage.removeItem('connectionId');
  }
  getConnectionState(){
    return this.connection.state;
  }
  /*
  sendMessage(){
    console.log(this.connection.state);
    this.connection.invoke('SendMessage', 'Cristian', 'Hola mundo');
  }*/
  getNewMessages(){
    return this.$newMessage.asObservable();
  }
}

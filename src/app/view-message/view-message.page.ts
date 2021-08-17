import { UserService } from './../services/user/user.service';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { NewMessage } from './../model/new-message';
import { MensajeService } from './../services/mensaje/mensaje.service';
import { Message } from './../model/message';
import { SignalrService } from './../services/signalr/signalr.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  messages: Message[] = [];
  id = '';
  idUser = '';
  contactName = '';
  newMessage = new NewMessage();
  constructor(
    private mensajeService: MensajeService,
    private activatedRoute: ActivatedRoute,
    private signalr: SignalrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParamMap.subscribe(params => this.contactName = params.get('contact'));
    this.idUser = this.userService.getPerfil().id;

    this.newMessage.receptorId = this.id;
    this.getMensajes();
    this.signalr.getNewMessages().subscribe( (message: Message) => {
      message.entrante = message.receptorUser.id === this.id ? false: true;
      if(message.emisorUser.id === this.idUser || message.receptorUser.id === this.idUser){
        this.messages.push(message);
        console.log(message);
        setTimeout(()=>{
          this.scrollToBottom();
        },2000);
      }
    });
  }
  async getMensajes(){
    this.messages = await this.mensajeService.listarMensajes(this.id).toPromise();
    setTimeout(()=>{
      this.scrollToBottom();
    },2000);
  }
  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
  async  enviarMensaje(){
    await this.mensajeService.enviarMensaje(this.newMessage).toPromise();
    this.newMessage.contenido = '';
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }

  scrollToTop() {
    this.getContent().scrollToTop(500);
  }
}

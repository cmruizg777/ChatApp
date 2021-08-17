/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { DataService, Message } from '../services/data.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contactos: Observable<User[]>;
  perfil: any;
  bienvenida = '';
  constructor(private userService: UserService, private navCtrl: NavController) {}
  refresh(ev) {
    //this.getContactos();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAll();
  }
  async getAll() {
    await this.userService.profile();
    this.perfil = this.userService.getPerfil();
    this.bienvenida = 'Bienvenido: ' + this.perfil.nombres + ' ' + this.perfil.apellidos;
    this.contactos = this.userService.listarContactos();
  }
  async logout(){
    await this.userService.logout();
  }
}

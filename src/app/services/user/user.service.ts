import { AlertService } from './../alert/alert.service';
import { NavController } from '@ionic/angular';
import { UserLogin } from './../../model/user-login';
import { Injectable } from '@angular/core';
import { ConexionService } from '../conexion/conexion.service';
import { UtilService } from '../util/util.service';
import { ApiService } from '../api/api.service';
import { User } from 'src/app/model/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  $state = new Subject<boolean>();
  constructor(
    private api: ApiService,
    private conexion: ConexionService,
    private util: UtilService,
    private navCtrl: NavController,
    private alert: AlertService
  ) { }

  async login(user: UserLogin){
    if(this.util.validarEmail(user.email) && user.password.trim()!==''){
      const login = await this.api.post('User/Login', user).toPromise();
      console.log(login);
      if(login.token){
        localStorage.setItem('token', login.token);
        this.$state.next(true);
      }else{
        this.$state.next(false);
      }
    }
    return;
  }
  async register(user: User){
    const login = await this.api.post('User/Registro', user).toPromise();
    console.log(login);
    if(login.token){
      localStorage.setItem('token', login.token);
      this.$state.next(true);
    }else{
      this.$state.next(false);
    }
  }
  async profile(){
    const perfil = await this.api.get('User/Perfil').toPromise();
    console.log(perfil);
    if(perfil.id){
      localStorage.setItem('perfil', JSON.stringify(perfil));
    }else{
      this.alert.show('Por favor, vuelva a iniciar sesión.');
      this.logout();
    }
  }
  async logout(){
    //const idConexion = localStorage.getItem('connectionId');
    //await this.conexion.borrarConexion(idConexion);
    localStorage.clear();
    this.$state.next(false);
    this.navCtrl.navigateRoot(['/login']);
  }
  listarContactos(){
    const list = this.api.get('User/Listar');
    return list;
  }
  getToken(){
    const token = localStorage.getItem('token');;
    if(token){
      return token;
    }
    return null;
  }
  getPerfil(){
    const strPerfil = localStorage.getItem('perfil');
    if(strPerfil){
      return JSON.parse(strPerfil);
    }
    return null;
  }
  getState(){
    return this.$state.asObservable();
  }
  checkState(){
    if(localStorage.getItem('token')){
      this.$state.next(true);
    }else{
      this.$state.next(false);
    }
  }
}

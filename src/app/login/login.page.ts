import { AlertService } from './../services/alert/alert.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util/util.service';
import { UserLogin } from '../model/user-login';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user =  new UserLogin();
  constructor(
    private userService: UserService,
    private util: UtilService,
    private alert: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.userService.getState().subscribe( logged => {
      if(logged){
        this.navCtrl.navigateRoot(['/home']);
      }
    });
    this.userService.checkState();
  }

  login(){
    if(!this.util.validarEmail(this.user.email)){
      this.alert.show('Email no válido.', 'Error');
      return;
    }
    if(!this.util.validarContrasena(this.user.password)){
      this.alert.show('Contraseña no válida', 'Error');
      return;
    }
    console.log(this.user);
    this.userService.login(this.user);
  }
}

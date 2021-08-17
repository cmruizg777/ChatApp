import { AlertService } from './../services/alert/alert.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user =  new User();
  errores = [];
  constructor(
    private userService: UserService,
    private util: UtilService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }
  register(){
    this.errores = this.util.validarUser(this.user);
    if(this.errores.length > 0){
      this.alert.show(this.errores[0],'Error');
    }
    this.userService.register(this.user);
  }
}

import { ConexionService } from './services/conexion/conexion.service';
import { SignalrService } from './services/signalr/signalr.service';
import { UserService } from './services/user/user.service';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private signalR: SignalrService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getState().subscribe(logged => {
      if(logged){
        this.signalR.startConnection();
      }else{
        this.signalR.closeConnection();
      }
    });
    this.userService.checkState();
  }
}

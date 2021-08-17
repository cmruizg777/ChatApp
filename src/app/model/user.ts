import { Message } from './message';

export class User{
  id              = '';
  email           = '';
  password        = '';
  confirmPassword = '';
  nombres         = '';
  apellidos       = '';
  mensaje         = new Message();
}

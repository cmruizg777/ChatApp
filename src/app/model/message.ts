import { UserNames } from './user names';
import { User } from './user';

export class Message{
  contenido     = '';
  fecha         = '';
  entrante      = true;
  emisorUser    = new UserNames();
  receptorUser  = new UserNames();
}

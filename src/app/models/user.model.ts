import { Position } from './position.model';
import { Role } from './role.model';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  active: boolean;
  role: Role;
  position: Position;

  constructor(
    id: string = '',
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    userName: string = '',
    active: boolean = false,
    role: Role = new Role(),
    position: Position = new Position()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.active = active;
    this.role = role;
    this.position = position;
  }
}

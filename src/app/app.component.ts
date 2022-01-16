import { Component, OnInit } from '@angular/core';
import { Position } from './models/position.model';
import { Role } from './models/role.model';
import { Status } from './models/status.model';
import { Type } from './models/type.model';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { PositionService } from './services/position.service';
import { RoleService } from './services/role.service';
import { StatusService } from './services/status.service';
import { TypeService } from './services/type.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tracking_system_frontend_angular';
  roles: Role[] = [];
  positions: Position[] = [];
  statuses: Status[] = [];
  types: Type[] = [];
  users: User[] = [];
  token: string = '';
  loading: boolean = false;

  constructor(
    private roleService: RoleService,
    private positionService: PositionService,
    private statusService: StatusService,
    private typeService: TypeService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.token = authService.getToken() || '';
  }

  getSelectInIssueForm() {
    this.statusService.getAll().subscribe((res: any) => {
      this.statuses = res;
    });
    this.typeService.getAll().subscribe((res: any) => {
      this.types = res;
    });
    this.userService.getAll().subscribe((res: any) => {
      this.users = res;
    });
  }
  getSelectInUserForm() {
    this.roleService.getAll().subscribe((res: any) => {
      this.roles = res;
    });
    this.positionService.getAll().subscribe((res: any) => {
      this.positions = res;
    });
  }

  ngOnInit(): void {}

  setToken(token: string) {
    this.token = token;
  }
}

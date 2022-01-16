import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public app: AppComponent
  ) {}

  getUsers() {
    this.loading = true;
    this.userService.getAll().subscribe(
      (res: any) => {
        this.users = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    if (this.users.length === 0) {
      this.getUsers();
    }
  }

  handleClickEdit(id: string) {
    this.router.navigate(['/users', id]);
  }

  handleClickDelete(id: string) {
    this.loading = true;
    this.userService.delete(id).subscribe(
      (res) => {
        alert(`Id ${id} is deleted!!`);
        this.getUsers();
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}

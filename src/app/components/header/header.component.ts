import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public app: AppComponent,
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleClickLogout() {
    this.authService.removeToken();
    this.app.setToken('');
    this.ngZone.run(() => this.router.navigateByUrl('/login'));
  }
}

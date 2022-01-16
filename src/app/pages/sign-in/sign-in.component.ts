import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isSubmitForm: boolean = false;

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private app: AppComponent
  ) {
    this.signInForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get userName() {
    return this.signInForm.get('userName');
  }

  get password() {
    return this.signInForm.get('password');
  }

  handleSubmitForm(e: Event) {
    e.preventDefault();
    this.isSubmitForm = true;
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        (res: any) => {
          const token = res?.payload?.token;
          this.authService.setToken(token);
          this.app.setToken(token);
          this.ngZone.run(() => this.router.navigateByUrl(''));
        },
        (err) => {
          console.dir(err);
        }
      );
    }
  }
}

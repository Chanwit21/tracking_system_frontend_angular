import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form-page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.css'],
})
export class UserFormPageComponent implements OnInit {
  btnName: string = 'Save';
  userForm: FormGroup;
  isSubmitForm: boolean = false;
  isEdit: boolean = false;
  id: string = '';
  loading: boolean = false;

  constructor(
    public app: AppComponent,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      active: new FormControl(false),
      roleId: new FormControl('', [Validators.required]),
      positionId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] === 'add') {
        this.isEdit = false;
        this.btnName = 'Save';
        this.userForm.setValue({
          firstName: '',
          lastName: '',
          email: '',
          userName: '',
          active: '',
          roleId: '',
          positionId: '',
        });
      } else if (!isNaN(params['id'])) {
        this.isEdit = true;
        this.btnName = 'Update';
        this.id = params['id'];
        this.loading = true;
        this.userService.getOne(params['id']).subscribe(
          (res: any) => {
            const {
              firstName,
              lastName,
              email,
              userName,
              active,
              role: { id: roleId },
              position: { id: positionId },
            } = res;

            this.userForm.setValue({
              firstName,
              lastName,
              email,
              userName,
              active,
              roleId: '' + roleId,
              positionId: '' + positionId,
            });
            this.loading = false;
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      }
    });

    const { roles, positions } = this.app;

    if (roles.length === 0 || positions.length === 0) {
      this.app.getSelectInUserForm();
    }
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get roleId() {
    return this.userForm.get('roleId');
  }

  get positionId() {
    return this.userForm.get('positionId');
  }

  handleSubmitForm(e: SubmitEvent) {
    e.preventDefault();
    this.isSubmitForm = true;
    const { active, email, firstName, lastName, positionId, roleId, userName } =
      this.userForm.value;

    const userTosend = {
      active,
      email,
      firstName,
      lastName,
      role: { id: roleId },
      position: { id: positionId },
      userName,
    };

    if (this.userForm.valid) {
      if (this.isEdit) {
        this.loading = true;
        this.userService.update(userTosend, this.id).subscribe(
          () => {
            console.log('Data update successfully');
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('users'));
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      } else {
        this.loading = true;
        this.userService.create(userTosend).subscribe(
          () => {
            console.log('Data added successfully');
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('users'));
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      }
    }
  }
}

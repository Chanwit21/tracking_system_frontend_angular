import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issue-form-page',
  templateUrl: './issue-form-page.component.html',
  styleUrls: ['./issue-form-page.component.css'],
})
export class IssueFormPageComponent implements OnInit {
  btnName: string = 'Save';
  issueForm: FormGroup;
  isSubmitForm: boolean = false;
  isEdit: boolean = false;
  id: string = '';
  loading: boolean = false;

  constructor(
    public app: AppComponent,
    private issueService: IssueService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.issueForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      attachment: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
      typeId: new FormControl('', [Validators.required]),
      assignToId: new FormControl('', [Validators.required]),
      createById: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] === 'add') {
        this.isEdit = false;
        this.btnName = 'Save';
        this.issueForm.setValue({
          title: '',
          description: '',
          attachment: '',
          statusId: '',
          typeId: '',
          assignToId: '',
          createById: '',
        });
      } else if (!isNaN(params['id'])) {
        this.isEdit = true;
        this.btnName = 'Update';
        this.id = params['id'];
        this.loading = true;
        this.issueService.getOne(params['id']).subscribe(
          (res: any) => {
            const {
              title,
              description,
              attachment,
              status: { id: statusId },
              type: { id: typeId },
              assignTo: { id: assignToId },
              createBy: { id: createById },
            } = res;

            this.issueForm.setValue({
              title,
              description,
              attachment,
              statusId,
              typeId,
              assignToId,
              createById,
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

    const { statuses, types, users } = this.app;

    if (statuses.length === 0 || types.length === 0 || users.length === 0) {
      this.app.getSelectInIssueForm();
    }
  }

  get title() {
    return this.issueForm.get('title');
  }

  get description() {
    return this.issueForm.get('description');
  }

  get attachment() {
    return this.issueForm.get('attachment');
  }

  get statusId() {
    return this.issueForm.get('statusId');
  }

  get typeId() {
    return this.issueForm.get('typeId');
  }

  get assignToId() {
    return this.issueForm.get('assignToId');
  }

  get createById() {
    return this.issueForm.get('createById');
  }

  handleSubmitForm(e: Event) {
    e.preventDefault();
    this.isSubmitForm = true;
    const {
      title,
      description,
      attachment,
      statusId,
      typeId,
      assignToId,
      createById,
    } = this.issueForm.value;

    const issueTosend = {
      title,
      description,
      attachment,
      status: { id: statusId },
      type: { id: typeId },
      assignTo: { id: assignToId },
      createBy: { id: createById },
    };

    if (this.issueForm.valid) {
      if (this.isEdit) {
        this.loading = true;
        this.issueService.update(issueTosend, this.id).subscribe(
          () => {
            console.log('Data update successfully');
            this.ngZone.run(() => this.router.navigateByUrl('issues'));
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      } else {
        this.loading = true;
        this.issueService.create(issueTosend).subscribe(
          () => {
            console.log('Data added successfully');
            this.ngZone.run(() => this.router.navigateByUrl('issues'));
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

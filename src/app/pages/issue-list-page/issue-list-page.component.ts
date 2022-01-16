import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Issue } from 'src/app/models/issue.model';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issue-list-page',
  templateUrl: './issue-list-page.component.html',
  styleUrls: ['./issue-list-page.component.css'],
})
export class IssueListPageComponent implements OnInit {
  issues: Issue[] = [];
  loading: boolean = false;

  constructor(
    private issueService: IssueService,
    private router: Router,
    public app: AppComponent
  ) {}

  getIssues() {
    this.loading = true;
    this.issueService.getAll().subscribe(
      (res: any) => {
        this.issues = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    if (this.issues.length === 0) {
      this.getIssues();
    }
  }

  handleClickEdit(id: string) {
    this.router.navigate(['/issues', id]);
  }

  handleClickDelete(id: string) {
    this.loading = true;
    this.issueService.delete(id).subscribe(
      (res) => {
        alert(`Id ${id} is deleted!!`);
        this.getIssues();
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}

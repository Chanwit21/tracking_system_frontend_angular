import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue.model';

@Component({
  selector: 'app-issue-component',
  templateUrl: './issue-component.component.html',
  styleUrls: ['./issue-component.component.css'],
})
export class IssueComponentComponent implements OnInit {
  @Input() issue: Issue = new Issue();

  constructor() {}

  ngOnInit(): void {}
}

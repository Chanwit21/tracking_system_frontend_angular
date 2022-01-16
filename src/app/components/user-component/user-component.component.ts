import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
})
export class UserComponentComponent implements OnInit {
  @Input() user: User = new User();

  constructor() {}

  ngOnInit(): void {}
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IssueFormPageComponent } from './pages/issue-form-page/issue-form-page.component';
import { IssueListPageComponent } from './pages/issue-list-page/issue-list-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'issues/:id', component: IssueFormPageComponent },
  { path: 'issues', component: IssueListPageComponent },
  { path: 'users/:id', component: UserFormPageComponent },
  { path: 'users', component: UserListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [
  HomeComponent,
  SignInComponent,
  IssueFormPageComponent,
  IssueListPageComponent,
  UserFormPageComponent,
  UserListPageComponent,
];

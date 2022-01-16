import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Node/Epress API
  API: string = `http://localhost:8080/api`;

  constructor(private httpClient: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  getToken() {
    return localStorage.getItem('access-token');
  }

  removeToken() {
    localStorage.removeItem('access-token');
  }

  signIn(data: any) {
    return this.httpClient.post(
      `${this.API}/login?userName=${data.userName}&password=${data.password}`,
      {}
    );
  }
}

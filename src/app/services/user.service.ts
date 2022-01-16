import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Node/Epress API
  API: string = `http://localhost:8080/api/user`;

  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }

  getOne(id: string) {
    return this.httpClient.get(`${this.API}/${id}`);
  }

  create(user: any) {
    return this.httpClient.post(`${this.API}`, user);
  }

  update(user: any, id: string) {
    return this.httpClient.put(`${this.API}/${id}`, user);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}

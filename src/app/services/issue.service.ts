import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  // Node/Epress API
  API: string = `http://localhost:8080/api/issue`;

  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }

  getOne(id: string) {
    return this.httpClient.get(`${this.API}/${id}`);
  }

  create(issue: any) {
    return this.httpClient.post(`${this.API}`, issue);
  }

  update(issue: any, id: string) {
    return this.httpClient.put(`${this.API}/${id}`, issue);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}

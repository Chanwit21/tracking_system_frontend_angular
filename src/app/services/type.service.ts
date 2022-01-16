import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  // Node/Epress API
  API: string = `http://localhost:8080/api/type`;

  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }
}

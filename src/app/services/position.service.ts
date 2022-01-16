import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  // Node/Epress API
  API: string = `http://localhost:8080/api/position`;

  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }
}

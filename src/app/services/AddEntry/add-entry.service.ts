import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddEntryService {
  private path = `http://localhost:8000/manager/create-entry/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json', // Example header
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(body: NewEntry) {
    return this.httpClient.post<{ data: Entry }>(this.path, body, {
      headers: this.headers,
    });
  }
}

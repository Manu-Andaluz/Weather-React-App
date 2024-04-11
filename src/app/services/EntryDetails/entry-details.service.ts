import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntryDetailsService {
  private path = `http://3.142.130.166:8000/manager/retrieve-entries/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(body: {
    search: number;
    master_password?: string;
    user_id: number;
  }) {
    return this.httpClient.post<{ data: Entry[] }>(this.path, body, {
      headers: this.headers,
    });
  }
}

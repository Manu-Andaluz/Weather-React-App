import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntryDetailsService {
  private path = `https://guardkey-production.up.railway.app/manager/retrieve-entries/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(body: {
    search: string;
    master_password?: string;
    user_id: number;
  }) {
    return this.httpClient.post<{ data: Entry[] }>(this.path, body, {
      headers: this.headers,
    });
  }
}

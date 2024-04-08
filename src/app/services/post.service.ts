import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private path = `${environment.apiPath}/manager/retrieve-entries/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  examplePost(body: { decrypt_password: boolean; user_id: string }) {
    return this.httpClient.post<{ data: Entry[] }>(this.path, body, {
      headers: this.headers,
    });
  }
}

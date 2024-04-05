import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private path = `https://guardkey-production.up.railway.app/auth/register/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(body: { username: string; email: string; password: string }) {
    return this.httpClient.post(this.path, body, { headers: this.headers });
  }
}

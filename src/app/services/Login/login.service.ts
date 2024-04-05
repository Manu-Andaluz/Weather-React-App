import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private path = `http://localhost:8000/auth/login/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(username: string, password: string) {
    return this.httpClient.post<User>(
      this.path,
      { username: username, password: password },
      { headers: this.headers }
    );
  }
}

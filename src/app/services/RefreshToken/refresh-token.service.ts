import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private path = `http://3.142.130.166:8000/auth/refresh-token/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(token: string) {
    return this.httpClient.post(
      this.path,
      { token: token },
      { headers: this.headers }
    );
  }
}

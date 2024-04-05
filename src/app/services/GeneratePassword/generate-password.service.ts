import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneratePasswordService {
  private path = `http://localhost:8000/manager/generate-password/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getRequest(password_length: number) {
    return this.httpClient.post<{ data: Entry[] }>(
      this.path,
      { password_length },
      { headers: this.headers }
    );
  }
}

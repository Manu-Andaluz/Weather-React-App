import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditEntryService {
  private path = `${environment.apiPath}/manager/edit-entry/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(body: {
    master_password: string;
    user_id: string;
    site_image: string;
    site_id: number;
  }) {
    return this.httpClient.patch<{ data: Entry[] }>(this.path, body, {
      headers: this.headers,
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteEntryService {
  private path = `https://guardkey-production.up.railway.app/manager/delete-entry/`;

  constructor(private httpClient: HttpClient) {}

  deleteRequest(master_password: string, search: string, user_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Master-Password': master_password,
    });

    return this.httpClient.delete<{ data: Entry }>(this.path, {
      headers: headers,
      params: { search: search, user_id: user_id },
    });
  }
}

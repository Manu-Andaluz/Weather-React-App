import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterPasswordService {
  private path = `${environment.apiPath}/manager/create-master-password/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(user_id: number, master_password: string) {
    return this.httpClient.post(
      this.path,
      { user_id, master_password },
      { headers: this.headers }
    );
  }
}

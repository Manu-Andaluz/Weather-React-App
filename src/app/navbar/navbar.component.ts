import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isUser: string | null = null;

  ngOnInit() {
    this.isUser = localStorage.getItem('guardkey_session_token');
  }

  logout() {
    const token = localStorage.getItem('guardkey_session_token');

    if (token) {
      localStorage.removeItem('guardkey_session_token');
    }

    window.location.reload();
  }
}

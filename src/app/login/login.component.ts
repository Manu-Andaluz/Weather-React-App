import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/Login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login_error?: string;
  errors: {
    username?: string;
    password?: string;
  } = {};
  submit_text_btn: string = 'Continue';
  constructor(private service: LoginService, private router: Router) {}

  validateForm() {
    const form = document.getElementById('login_form') as HTMLFormElement;
    const formData = new FormData(form) as any;

    console.log(formData.get('username'));

    if (!formData.get('username')) {
      this.errors.username = 'Username required';
    } else {
      this.errors.username = undefined;
    }

    if (!formData.get('password')) {
      this.errors.password = 'Password required';
    } else {
      this.errors.password = undefined;
    }
  }

  login(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.validateForm();

    if (!this.errors.username && !this.errors.password) {
      const form = document.getElementById('login_form') as HTMLFormElement;
      const formData = new FormData(form) as any;

      this.service
        .postRequest(formData.get('username'), formData.get('password'))
        .subscribe(
          (response: User) => {
            localStorage.setItem('guardkey_session_token', response.token);
            this.router.navigateByUrl('/');
          },
          (error: any) => {
            this.submit_text_btn = 'Continue';
            this.login_error = error.error;
          },
          () => {
            this.submit_text_btn = 'Sending ...';
          }
        );
    }
  }
}

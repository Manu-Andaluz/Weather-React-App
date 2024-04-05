import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddEntryService } from '../services/AddEntry/add-entry.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  constructor(private service: AddEntryService, private router: Router) {}

  master_password_error?: string;
  errors: FormErrors = {
    master_password: '',
    site_name: '',
    email: '',
    password: '',
  };

  validateForm(form: HTMLFormElement | any) {
    let errors = {} as any;

    if (!form.master_password.value) {
      errors.master_password = 'Master password is required';
    }

    if (!form.site_name.value) {
      errors.site_name = 'Site name is required';
    }

    if (!form.email.value) {
      errors.email = 'Email is required';
    }

    if (!form.password.value) {
      errors.password = 'Password is required';
    }

    return errors;
  }

  getFormData(event: Event) {
    event.preventDefault();
    const form = document.getElementById('add_entry') as HTMLFormElement;
    const errors = this.validateForm(form);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    const formData = {} as any;

    form.querySelectorAll('input').forEach((input) => {
      formData[input.id] = input.value;
    });

    const token = localStorage.getItem('guardkey_session_token') as string;
    const decodedToken = jwtDecode(token) as any;
    formData.user_id = decodedToken.user_id;

    this.service.postRequest(formData).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/');
      },
      (error: any) => {
        console.log(error);
        this.master_password_error = error.error;
      }
    );
  }
}

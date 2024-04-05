import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MasterPasswordService } from '../services/MasterPassword/master-password.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RefreshTokenService } from '../services/RefreshToken/refresh-token.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {
  constructor(
    private service: MasterPasswordService,
    private refresh_service: RefreshTokenService,
    private router: Router
  ) {}

  setMasterPassword(e: Event) {
    e.preventDefault();
    const input = document.getElementById(
      'master_password'
    ) as HTMLInputElement;

    const token = localStorage.getItem('guardkey_session_token') as string;
    const decodedToken = jwtDecode(token) as any;

    if (decodedToken) {
      this.service.postRequest(decodedToken.user_id, input.value).subscribe(
        (response: any) => {
          console.log(response);

          this.refresh_service.postRequest(token).subscribe((response: any) => {
            localStorage.setItem('guardkey_session_token', response.token);
            this.router.navigateByUrl('/');
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}

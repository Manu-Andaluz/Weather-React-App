import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GeneratePasswordService } from '../services/GeneratePassword/generate-password.service';

@Component({
  selector: 'app-generate-password',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './generate-password.component.html',
  styleUrl: './generate-password.component.scss',
})
export class GeneratePasswordComponent {
  generated_password: string = '';

  constructor(private service: GeneratePasswordService) {}

  getPassowrd() {
    const input = document.getElementById(
      'password_length'
    ) as HTMLInputElement;

    this.service.getRequest(input.value ? Number(input.value) : 50).subscribe(
      (response: any) => {
        this.generated_password = response.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getPassowrd();
  }

  copyClipboard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(this.generated_password);

    // Alert the copied text
    const tooltip = document.getElementById('tooltiptext') as HTMLElement;
    tooltip.innerText = `Copied !!`;

    setTimeout(() => {
      tooltip.innerText = `Copy to the clipboard`;
    }, 2000);
  }
}

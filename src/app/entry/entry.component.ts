import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { EntryDetailsService } from '../services/EntryDetails/entry-details.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  constructor(
    private service: EntryDetailsService,
    private route: ActivatedRoute
  ) {}
  entry_id: string = '';
  entry?: Entry;
  private master_password?: string = undefined;

  async getEntry({
    search = this.entry_id,
    fromModal = false,
  }: {
    search?: string;
    fromModal?: boolean;
  }) {
    const token = localStorage.getItem('guardkey_session_token') as string;

    if (token) {
      if (fromModal && !this.master_password) {
        await this.getModalValue();
      }

      const decodedToken = jwtDecode(token) as any;

      this.service
        .postRequest({
          master_password: this.master_password,
          search: search,
          user_id: decodedToken.user_id,
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.entry = response.data[0];
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getEntry({ search: params['id'] });
      this.entry_id = params['id'];
    });
  }

  closeModal = (event: Event): void => {
    event.preventDefault();
    const modalElement = document.getElementById(
      'entry_password_modal'
    ) as HTMLDialogElement;
    modalElement.classList.add('close');
    const animationEndHandler = (event: any) => {
      modalElement.close();
      modalElement.classList.remove('close');
      modalElement.removeEventListener('animationend', animationEndHandler);
    };
    modalElement.addEventListener('animationend', animationEndHandler);

    setTimeout(() => {
      modalElement.classList.add('open');
    });
  };

  getModalValue() {
    const dialog = document.getElementById(
      'entry_password_modal'
    ) as HTMLDialogElement;

    return new Promise<void>((resolve) => {
      const closeHandler = () => {
        dialog.removeEventListener('close', closeHandler);

        const master_password_input = document.getElementById(
          'entry_master_password'
        ) as any;
        console.log(master_password_input.value);
        this.master_password = master_password_input.value;
        resolve();
      };

      dialog.addEventListener('close', closeHandler);
      dialog.showModal();
    });
  }
}

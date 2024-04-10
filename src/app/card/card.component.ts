import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DeleteEntryService } from '../services/DeleteEntry/delete-entry.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() image_link: string = '';
  @Input() website_name: string = '';
  @Input() website_url: string = '';
  @Input() password_quantity: number = 1;
  @Input() entry_id?: number | any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  private master_password: string | undefined = undefined;

  constructor(private service: DeleteEntryService) {}

  deleteRequest(master_password: string, search: number, user_id: number) {
    return this.service
      .deleteRequest(master_password, search, user_id)
      .subscribe(
        (response: { data: Entry }) => {
          window.location.reload();
        },
        (error: any) => {
          alert(error.error);
          this.master_password = undefined;
        }
      );
  }

  async deleteEntry(search?: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (search) {
      if (!this.master_password) {
        await this.getModalValue(search);
      }

      const token = localStorage.getItem('guardkey_session_token') as string;

      if (token) {
        const decodedtoken = jwtDecode(token) as any;
        this.deleteRequest(
          this.master_password || '',
          search,
          decodedtoken.user_id
        );
      }

      return;
    }
  }

  getModalValue(search?: number) {
    const dialog = document.getElementById('card_modal') as HTMLDialogElement;

    return new Promise<void>((resolve) => {
      const closeHandler = () => {
        dialog.removeEventListener('close', closeHandler);

        const master_password_input = document.getElementById(
          'landing_master_password'
        ) as any;
        this.master_password = master_password_input.value;
        resolve();
        this.deleteEntry(search);
      };

      dialog.addEventListener('close', closeHandler);
      dialog.showModal();
    });
  }
}

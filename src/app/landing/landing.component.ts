import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CardComponent, NavbarComponent, CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private service: PostService, private router: Router) {}

  entries: Entry[] = [];
  card_modal_entry?: Entry;
  isUser: Boolean = false;
  @ViewChild('card_modal') cardModal!: ElementRef;

  testPost() {
    const token = localStorage.getItem('guardkey_session_token') as string;

    if (token) {
      const decodedToken = jwtDecode(token) as any;

      this.service
        .examplePost({
          decrypt_password: false,
          user_id: decodedToken.user_id,
        })
        .subscribe(
          (response: { data: Entry[] }) => {
            this.entries = response.data;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.testPost(); // Call testPost() when the component is initialized
    const token = localStorage.getItem('guardkey_session_token') as string;
    if (token) {
      this.isUser = true;
      const decodedToken = jwtDecode(token) as any;
      if (decodedToken.onboarding === true) {
        this.router.navigateByUrl('/onboarding');
      }
    }
  }

  openModal = (card_entry: Entry): void => {
    this.card_modal_entry = card_entry;
    const modalElement = this.cardModal.nativeElement as HTMLDialogElement;
    modalElement.open = true;
  };

  closeModal = (event: Event): void => {
    event.preventDefault();
    const modalElement = this.cardModal.nativeElement as HTMLDialogElement;
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
}

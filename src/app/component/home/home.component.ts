import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isDarkMode = false;

  constructor(private router: Router) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isDarkMode = event.matches;
    });
  }

  login() {
    this.router.navigateByUrl('overview').then(r => {
      if (!r) {
        console.error('failed to navigate to overview from home');
      }
    });
  }

}

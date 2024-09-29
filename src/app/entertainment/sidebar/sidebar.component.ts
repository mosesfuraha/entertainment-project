import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showPopup = false;

  constructor(private router: Router) {}

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  navigateToLogin() {
    this.router.navigate(['auth']);
  }

  navigateToSignup() {
    this.router.navigate(['auth/signup']);
  }
}

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private loggedIn = false;

  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      this.loggedIn = true; // Set loggedIn to true when registered successfully
      return updateProfile(response.user, { displayName: username });
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      this.loggedIn = true; // Set loggedIn to true when logged in successfully
    });
    return from(promise);
  }

  isAuthenticated(): boolean {
    return this.loggedIn; // Return the current authentication state
  }

  logout(): void {
    this.loggedIn = false; // Reset the login state on logout
  }
}

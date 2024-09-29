import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { from, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private loggedIn = new BehaviorSubject<boolean>(false); // Use BehaviorSubject for state

  constructor() {
    // Listen for changes in the auth state (logged in/out)
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.loggedIn.next(!!user); // Update the login state based on the user
    });
  }

  // Register user
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
      this.loggedIn.next(true);
    });
    return from(promise);
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Observable of login state
  }

  logout(): void {
    signOut(this.firebaseAuth).then(() => {
      this.loggedIn.next(false); // Update login state
    });
  }

  // Optionally, get the currently logged-in user
  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      onAuthStateChanged(this.firebaseAuth, (user) => {
        observer.next(user);
        observer.complete();
      });
    });
  }
}

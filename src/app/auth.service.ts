import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedGuard!: boolean;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.toastr.success('Login Successful');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedGuard = true;
        this.router.navigate(['/form']);
      })
      .catch((e) => {
        this.toastr.warning(e);
      });
  }

  register(email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.toastr.success('Registration Successful');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedGuard = true;
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.toastr.success('Logout Successful');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedGuard = false;
      this.router.navigate(['/login']);
    });
  }

  loadUser() {
    this.angularFireAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}

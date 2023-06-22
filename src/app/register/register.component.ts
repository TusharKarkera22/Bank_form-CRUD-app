
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email!: string;
  password!: string;
  isRegistering: boolean = false;
  registrationError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      this.isRegistering = true;
      this.registrationError = '';
      await this.authService.register(this.email, this.password);
      this.isRegistering = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error registering user:', error);
      this.isRegistering = false;
      this.registrationError = 'Registration failed. Please try again.';
    }
  }
}

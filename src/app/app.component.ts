import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bank-form';
  constructor(public db: AngularFireDatabase, public authService: AuthService) {}



  ngOnInit() {

    this.db.list("test").push("test")

    .then( result =>

      console.log(result.key)

    );

  }

  logout() {
    this.authService.logout();
  }
}

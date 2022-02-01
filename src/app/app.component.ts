import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'watchlist-frontend';
  constructor(private _authService: AuthService){}

  loggedIn(){
    return this._authService.loggedIn();
  }

  logoutUser(){
    return this._authService.logoutUser();
  }
}

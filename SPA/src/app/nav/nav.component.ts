import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { SignalrService } from '../_services/signalr.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;
  @Output() loginEmmiter = new EventEmitter<string>();
  @Output() registerEmmiter = new EventEmitter<string>();

constructor(
  public authService: AuthService,
  private alertify: AlertifyService,
  private router: Router,
  private signalr: SignalrService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    this.signalr.disconnect();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';
import { SignalrService } from './_services/signalr.service';
import { AlertifyService } from './_services/alertify.service';
import { Message } from './_models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sozka app';

constructor(
  private authService: AuthService,
  private jwtHelperService: JwtHelperService,
  private signalr: SignalrService,
  private alertify: AlertifyService) {}

  ngOnInit() {
    // this loads decodedToken in service to show user-name in nav-component
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      if (this.authService.currentUser.photoUrl != null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../assets/user.png');
      }
      this.signalr.connectionEstablished.subscribe(data => {
        if (data) {
          this.signalr.addToGroup(this.authService.decodedToken.nameid);
        }
      });
    }
    this.signalr.messageReceived.subscribe((message: Message) => {
      this.alertify.success(message.content);
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User; // this property will be setting from parent-component

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
  }

  sendLike(id: number) { // recipient id
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(data => {
        this.alertify.success('You have liked: ' + this.user.knownAs);
      }, error => {
        this.alertify.error(error);
      });
  }
}

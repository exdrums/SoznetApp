import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends: User[]; // my requests
  friendsToAccept: User[]; // requests to me

  showedFriends: User[];
  showOptions = 'Friends'; // Pending - Outgoing - Friends

constructor(
  private route: ActivatedRoute,
  private userService: UserService,
  private authService: AuthService,
  private alertify: AlertifyService
) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.friends = data['friends'];
      this.friendsToAccept = data['friendsToAccept'];
      this.showFriends();
    });
  }

  showFriends() {
    if (this.showOptions === 'Pending') {
      this.showedFriends = this.friendsToAccept.filter(x => {
        let result = true;
        this.friends.forEach(f => {
          if (f.id !== x.id) {
            result = false;
          }
        });
        return result;
      });
    } else if (this.showOptions === 'Outgoing') {
      this.showedFriends = this.friends.filter(x => {
        let result = true;
        this.friendsToAccept.forEach(f => {
          if (f.id !== x.id) {
            result = false;
          }
        });
        return result;
      });
    } else {
      this.showedFriends = this.friends.filter(x => {
        let result = false;
        this.friendsToAccept.forEach(f => {
          if (f.id === x.id) {
            result = true;
          }
        });
        return result;
      });
    }
    // console.log(this.friends);
    // console.log(this.friendsToAccept);
    // console.log(this.showedFriends);
  }

  // to debug both
  addContact(contactId: number) {
    this.userService.addFriend(this.authService.currentUser.id, contactId)
    .subscribe(data => {
      this.alertify.success('You have added this friend');
      // delete from array
    }, error => {
      this.alertify.error(error);
    });
  }
  deleteContact(contactId: number) {
    this.userService.deleteFriend(this.authService.currentUser.id, contactId)
    .subscribe(data => {
      this.alertify.success('You have deleted this friend');
      // delete from array TODO
    }, error => {
      this.alertify.error(error);
    });
  }
}

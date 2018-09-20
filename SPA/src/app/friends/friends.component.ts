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
          if (f.id === x.id) {
            result = false;
          }
        });
        return result;
      });
    } else if (this.showOptions === 'Outgoing') {
      this.showedFriends = this.friends.filter(x => {
        let result = true;
        this.friendsToAccept.forEach(f => {
          if (f.id === x.id) {
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
  }

  addContact(contact: User) {
    this.userService.addFriend(this.authService.currentUser.id, contact.id)
    .subscribe(data => {
      this.alertify.success('You have added this friend');
      const ind: number = this.friendsToAccept.indexOf(contact);
      if (ind !== -1) {
        // this.friendsToAccept.splice(ind, 1);
        this.friends.unshift(contact);
      }
      this.showFriends();
    }, error => {
      this.alertify.error(error);
    });
  }
  deleteContact(contact: User) {
    this.userService.deleteFriend(this.authService.currentUser.id, contact.id)
    .subscribe(data => {
      this.alertify.success('You have deleted this friend');
      const ind: number = this.friends.indexOf(contact);
      if (ind !== -1) {
        // delete friend
        this.friends.splice(ind, 1);
        // if (this.showOptions !== 'Friends') {
        //   this.friendsToAccept.unshift(contact);
        // }
      }
      this.showFriends();
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }
}

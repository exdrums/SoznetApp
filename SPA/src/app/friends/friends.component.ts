import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends: User[]; // my requests
  friendsToAccept: User[]; // requests to me

  showedFriends: User[]; // my accepted requests
  showOptions = 'Friends'; // Pending - Outgoing - Friends

constructor(
  private route: ActivatedRoute
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
    console.log(this.friends);
    console.log(this.friendsToAccept);
    console.log(this.showedFriends);

  }

}

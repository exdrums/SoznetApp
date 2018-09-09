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
  acceptedFriends: User[]; // my accepted requests

constructor(
  private route: ActivatedRoute
) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.friends = data['friends'];
      this.friendsToAccept = data['friendsToAccept'];

      // if in both then accepted
    });
  }
}

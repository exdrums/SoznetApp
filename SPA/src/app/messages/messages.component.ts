import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { Message } from '../_models/message';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid, this.pagination.currentPage,
        this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((result: PaginatedResult<Message[]>) => {
        this.messages = result.result;
        this.pagination = result.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete the message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(_.findIndex(this.messages, {id: id}), 1);
        this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}

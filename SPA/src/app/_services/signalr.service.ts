import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from '../../../node_modules/rxjs';
import { Message } from '../_models/message';
import { environment } from '../../environments/environment';
import { AlertifyService } from './alertify.service';


@Injectable()
export class SignalrService {

  private hubConnection: HubConnection;
  messageReceived = new Subject;
  connectionEstablished = new Subject<Boolean>();
  baseUrl = environment.apiUrl;

constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: Message, userId: string) {
    this.hubConnection.invoke('SendMessage', message, userId);
  }

  addToGroup(groupName: string) {
    this.hubConnection.invoke('AddToGroup', groupName);
  }

  public createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl + 'srhub')
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('PrivateMessage', (data: any) => {
      console.log('onPrivateMessageRecieved');
      this.messageReceived.next(data);
    });
    this.hubConnection.on('ReceiveSystemMessage', (data: any) => {
      console.log('System:' + data);
    });
  }
}

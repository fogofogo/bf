import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() notification;
  notificationDate;
  notificationLink: string;

  constructor() { }

  ngOnInit() {

    this.notificationDate = moment(this.notification.timestamp).format('MMM Do YYYY, h:mma');

    this.setNotificationLinks();
  }

  private setNotificationLinks(): void {
    switch (this.notification.type) {
      case 'competition':
        this.notificationLink = 'competition/' + this.notification.type + '/home';
        break;
      case 'profile':
        this.notificationLink = 'profile';
        break;

      default:
        this.notificationLink = '';
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService, MessageService } from "../../shared/";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications;
  unreadNotifications: boolean = true;

  constructor(private messagesService: MessageService) { }

  ngOnInit() {
    this.messagesService.getAllMessages()
      .subscribe((notifications) => {
        //this.loading = false;
        this.notifications = notifications

        // set the notification icon colour to green if there are notifications
        this.unreadNotifications = notifications.filter(notification => notification.isRead == false).length;

      })
  }

}

import { Messages } from './../models/messages.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { User } from '../models';
import { UserService, MessageService, JwtService, LiveMessageService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private messagesService: MessageService,
    private liveMessageService: LiveMessageService,
    private jwtService: JwtService,
  ) { }

  private socketSubscription: Subscription
  currentUser: User;
  notifications;
  unreadNotifications: boolean;
  readNotifications;
  isMobileMenuOpen;
  playerDetails;
  messageSubscribe: string = "SUBSCRIBE player.";

  ngOnInit() {
this.liveMessageService.connect();
    // get all messages on page load
    this.messagesService.getAllMessages()
      .subscribe((notifications) => {
        this.notifications = notifications
      })

    // get the logged in user
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )

    // connect to web socket to listen for messages
    if (this.currentUser) {

      this.socketSubscription = this.liveMessageService.messages.subscribe((message) => {
        this.notifications.push(JSON.parse(message.split('player.' + this.currentUser.id + ":")[1]));
        this.unreadNotifications = this.notifications.filter(notification => notification.read == false).length;

      })
      this.liveMessageService.send(this.messageSubscribe + this.currentUser.id)
    }
  }

  public changeRoute(routeValue: string): void {
    this.isMobileMenuOpen = false;
    this.router.navigate([routeValue]);
  }


  public logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  public onNotificationClose(): void {
    // build array of ids to send back to the server
    // this.readNotifications = this.notifications.filter(notification => notification.isRead == false)
    //   .map(a => a.notificationId)
    // this.unreadNotifications = null;
  }
}

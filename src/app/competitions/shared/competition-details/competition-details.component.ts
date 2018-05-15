import { User } from './../../../shared/models/user.model';
import { UserService, CompetitionsService } from './../../../shared/services';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { trigger, style, transition, animate, keyframes, query, stagger, state, group } from '@angular/animations';
@Component({
  selector: 'competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.scss'],

  animations: [
    trigger('valueAnimation', [
      transition(':increment', group([
        query(':enter', [
          style({ color: '#80b245' }),
          animate('1s ease-in', style('*'))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({ color: '#f70036' }),
          animate('1s ease-in', style('*'))
        ])
      ]))
    ])
  ]
})
export class CompetitionDetailsComponent implements OnInit {

  @Input() competition;
  @Input() isJoinedPlayer;
  @Input() viewAction = false;
  error: boolean = false
  startingDateTime;
  remainingDays;
  competitionStartDate;
  startsIn: string;
  todaysdate = moment();
  public showCountdown: Boolean = false;


  constructor(
    private toastyService: ToastyService,
    public router: Router,
    private userService: UserService,
    private competitionsService: CompetitionsService, ) { }
  currentUser: User;
  pointsBalance: number;

  ngOnInit() {

    this.competitionsService.updatePointsBalance$.subscribe(
      (pointsBalance) => {
        this.pointsBalance = pointsBalance;
      }
    )

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )

    //TODO: move to service
    this.startingDateTime = moment(this.competition.startTime).format('ddd, MMM Do YYYY, h:mma')

    this.competitionStartDate = moment(this.competition.startTime);
    this.remainingDays = this.competitionStartDate.diff(this.todaysdate, 'days');

    if (this.competitionStartDate.diff(this.todaysdate, 'days') > 7) {
      this.startsIn = this.competitionStartDate.diff(this.todaysdate, 'weeks') + ' weeks'
    } else if (this.competitionStartDate.diff(this.todaysdate, 'days') >= 1) {
      this.startsIn = this.competitionStartDate.diff(this.todaysdate, 'days') + ' days'
    } else {
      this.showCountdown = true;
    }

  }

  public calculatePot(buyInPrice, fee, playerCount) {
    return (buyInPrice - fee) * playerCount
  }

  joinUserCompetition(competitonId: number): void {

    this.competitionsService.joinCompetition(competitonId).subscribe(
      (response) => {
        // temporay notification that users has joined
        if (!isNaN(response.competitionParticipantId)) alert('User has joined')

      }
    )
  }
}

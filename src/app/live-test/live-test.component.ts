import { Component, OnInit } from '@angular/core';
import { CompetitionsService, LiveOddsService } from './../shared';
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-live-test',
  templateUrl: './live-test.component.html',
  styleUrls: ['./live-test.component.scss']
})
export class LiveTestComponent implements OnInit {
  markets: any;
  fixtureId: number;
  sub: any;
  private socketSubscription: Subscription

  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private liveOddsService: LiveOddsService,
  ) {

  }

  ngOnInit() {

    this.liveOddsService.connect();

    this.socketSubscription = this.liveOddsService.messages.subscribe((message) => {

      const array = message.split("odds.1:")[1];
      const result = JSON.parse(array);
      console.log(result);

      this.markets = result;

    })

    // send message to server, if the socket is not connected it will be sent
    // as soon as the connection becomes available thanks to QueueingSubject
    //this.liveOddsService.send('PSUBSCRIBE')
    this.liveOddsService.send('SUBSCRIBE odds.1')
    //this.liveOddsService.send('SUBSCRIBE status.1')

    this.sub = this.route.params.subscribe(params => {
      this.fixtureId = +params['fixtureId'];
    });

    this.competitionService.getMarketsPreLive(this.fixtureId).subscribe((markets) => {
      this.markets = markets
    })
  }

  trackByFn(index, item) {
   
  return item.id;
}

 trackByFn1(index, item) {

  return item.naturalId;
}

  ngOnDestroy() {
    //this.socketSubscription.unsubscribe()
  }

}

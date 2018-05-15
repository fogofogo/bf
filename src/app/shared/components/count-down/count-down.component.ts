import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription;
  public time: string;

  @Input() inputDate: Date;

  constructor(elm: ElementRef) {
    this.futureString = elm.nativeElement.getAttribute('inputDate');
  }

  private dhms(t) {
    var days, hours, minutes, seconds;

    days = Math.floor(t / 86400);
    t -= days * 86400;

    hours = Math.floor(t / 3600) % 24;
    if (hours < 10) {
      hours = "0" + hours;
    }
    t -= hours * 3600;

    minutes = Math.floor(t / 60) % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    t -= minutes * 60;

    seconds = t % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return [
      hours + ':',
      minutes + ':',
      seconds + ''
    ].join(' ');
  }


  ngOnInit() {

    this.future = new Date(this.inputDate);
    this.$counter = Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.time = this.dhms(this.diff));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

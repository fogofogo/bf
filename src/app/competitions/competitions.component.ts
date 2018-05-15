import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from './../shared/services/competitions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  public loading = true;

  sport: string = 'All';
  competitionSortOrder: string = 'startTime';

  constructor(
    private service: CompetitionsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService) { }

  competitions;

  ngOnInit() {

    this.service.getAllCompetitions()
      .subscribe((competitions) => {
        this.loading = false;
        this.competitions = competitions.filter(val => {
          return val.id > 129;
        });
      })
  }

  public filterChangedHandler(sport): void {
    this.sport = sport;
  }

  public sortChangedHandler(sort): void {
    this.competitionSortOrder = sort;
  }

}

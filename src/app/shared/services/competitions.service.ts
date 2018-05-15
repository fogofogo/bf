import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';
import { Competitions } from '../models';
import { CompetitionDetail } from '../models';

@Injectable()
export class CompetitionsService {

  // When there is successfully placed bets - set up observable to update bet history widget.
  private updateBetHistorySource = new Subject<string>();
  updateBetHistory$ = this.updateBetHistorySource.asObservable();

  updateBetHistory(newBetsPlaced: string) {
    this.updateBetHistorySource.next(newBetsPlaced);
  }

  // Get the players points for a competition
  private updatePointsBalanceSource =  new BehaviorSubject<number>(10000);
  updatePointsBalance$ = this.updatePointsBalanceSource.asObservable();

  updatePointsBalance(changedPoints: number) {
    this.updatePointsBalanceSource.next(changedPoints);
  }

    // Get the players points for a competition
  private leaderboardSource =  new Subject<string>();
  leaderboard$ = this.leaderboardSource.asObservable();

  setLeaderboard(leaderBoard) {
    this.leaderboardSource.next(leaderBoard);
  }

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  // get(): Observable<Competitions> {
  //   return this.apiService.get('/api/competitions/')
  //          .map((data: Competitions) => data);
  // }

  getAllCompetitions() {
    return this.apiService.get('/competitions/')
  }

  // getAllCompetitions(): Observable<Competitions> {
  //   return this.http.get(`${environment.api_url}` + '/dev/api/competitions/'
  //   )
  // }

  //  getCompetition(competitionId): Observable<Competitions> {
  //   return this.apiService.get('/api/competition/' + competitionId)
  //          .map((data: CompetitionDetail) => data);
  // }

  getCompetition(competitionId) {
    return this.apiService.get('/competitions/' + competitionId)
  }

  joinCompetition(competitionId) {
    return this.apiService.post('/competitions/' + competitionId + '/join', {})
  }

  getFixture() {
    //return this.apiService.get('/api/competition/' + competitionId + '/match/' + matchId)
    return this.http.get('../../assets/fake/competition-event-detail.json')
  }

  getMarketsPreLive(fixtureId: number) {
    return this.apiService.get('/fixtures/' + fixtureId + '/markets')
    //return this.http.get('../../assets/fake/markets.json')
  }

  getBetHistory(competitionId) {
    return this.apiService.get('/competitions/' + competitionId + '/bets/')
  }

  getLeaderboard(competitionId) {
    return this.apiService.get('/competitions/' + competitionId + '/leaderboard/')
  }

  getTempPlayer(id) {
    return this.apiService.get('/players/' + id)
  }


  // getFixture(competitionId, matchId): Observable<Competitions> {
  //   //return this.apiService.get('/api/competition/' + competitionId + '/match/' + matchId)

  //   return this.http.get('../../assets/fake/competition.json')
  // }

}

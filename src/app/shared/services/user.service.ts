import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }


  getTempPlayer(id) {
    return this.apiService.get('/players/' + id).subscribe(
        data => this.setAuth(data)
        );
  }

  populate() {
    if (this.jwtService.getPlayer()) {

      this.setAuth(this.jwtService.getPlayer())

    //   this.apiService.get('/dev/api/user')
    //     .subscribe(
    //     data => this.setAuth(data),
    //     err => this.purgeAuth()
    //     );
    // } else {
    //   this.purgeAuth();
    // }
  } else {
    this.purgeAuth();
  }
  }

  setAuth(user) {
    // Set current user data into observable

    if (typeof user === 'string') user = JSON.parse(user)

    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyPlayer();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  setAuthApi(authType) {
    if (authType == 'login') {
      return '/dev/api/token';
    } else if (authType == 'register') {
      return '/dev/api/register';
    }
    return '/dev/api/password';
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updatePhoneNumber(body): Observable<any> {
    return this.http.post(
      `${environment.api_url}` + '/dev/api/user/phonenumber', body
    )
  }

  updateAddress(body): Observable<any> {
    return this.http.post(
      `${environment.api_url}` + '/dev//api/user/address', body
    )
  }

  changePassword(body): Observable<any> {
    return this.http.post(
      `${environment.api_url}` + '/dev/api/password', body
    )
  }

  attemptAuth(type, body): Observable<any> {
    let route = this.setAuthApi(type);
    return this.http.post(
      `${environment.api_url}` + route, body
    )
  }

  getPreviousCompetitions() {
    return this.http.get('../../assets/fake/player-competitions.json')
  }

   getAllTransactions() {
    return this.http.get('../../assets/fake/transactions.json')
  }

  getBetHistoryForCompetition() {
    return this.http.get('../../assets/fake/bet-history.json')
  }

  getBetHistoryLast5ForCompetition() {
    return this.http.get('../../assets/fake/bet-history-last-5.json')
  }

}

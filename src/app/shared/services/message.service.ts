import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

import { environment } from '../../../environments/environment';
import { Messages } from '../models';

@Injectable()
export class MessageService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  getAllMessages(): Observable<any> {
    // /notifications/
    return this.apiService.get('/notifications/')
  }
}

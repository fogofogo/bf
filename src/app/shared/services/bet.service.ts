import { Injectable } from '@angular/core';
import { Bet, Bets } from '../../shared/models';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { of } from 'rxjs/observable/of';
import { ApiService } from './api.service';
@Injectable()


export class BetService {
    private itemsInBetSlipSubject: BehaviorSubject<Bets[]> = new BehaviorSubject([]);
    public _navSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private itemsInBetSlip = [];

    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private apiService: ApiService, ) {
        this.itemsInBetSlipSubject.subscribe(_ => this.itemsInBetSlip = _);
    }


    public addToBetSlip(bet) { // TODO: interface this

        // check that bet is not already in slip
        if (this.itemsInBetSlip.findIndex(i => i.outcomeId === bet.outcomeId) === -1) {
            this.itemsInBetSlip.unshift(bet)
            this.itemsInBetSlipSubject.next([...this.itemsInBetSlip]);

        } else {
            this.toastyService.error('You already have this bet in your betslip!');
        }
    }

    public addMultipleToBetSlip(bets) { // TODO: interface this
        this.itemsInBetSlip.unshift(bets)
        this.itemsInBetSlipSubject.next(bets);
    }

    public removeAllBet() {
        this.itemsInBetSlipSubject.next([]);
    }

    public getBets(): Observable<Bets[]> {
        return this.itemsInBetSlipSubject;
    }

    public postBets(bets, competitionId): Observable<any> {
        return this.apiService.post('/competitions/'+ competitionId + '/bets', bets)
    }
}
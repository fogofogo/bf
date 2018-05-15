export interface Bet {
    competitionId: string;
    matchId: number;
    marketId: number;
    odds: number;
} 

// export interface Bet {
//     competitionId: string;
//     id: string;
//     marketId: number;
//     marketOutcomeId: number;
//     matchId: number;
//     odds: number;
//     playerId: string;
//     stake: number;

// } 

export interface Bets extends Array<Bet>{}

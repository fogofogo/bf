import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundNumber'
})

@Injectable()
export class RoundPipe implements PipeTransform {

     transform(value: number): number {
        return Math.round(value);
    }
}
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter',
})

@Injectable()
export class SportFilterPipe implements PipeTransform {

    transform(items: any[], value: string): any[] {
        if (!value || value == 'All') return items;
        if (!items) return [];
        return items.filter(it => it['sports'] == value);
    }
}


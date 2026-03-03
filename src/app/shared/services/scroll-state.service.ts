import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
    trendingScrollState = signal(0);
    searchScrollState = signal(0);
    private searchScrollStateByKey = signal<Record<string, number>>({});
    getSearchScrollState(key: string): number {
    return this.searchScrollStateByKey()[key] ?? 0;
  }

  setSearchScrollState(key: string, value: number) {
    this.searchScrollStateByKey.update(map => ({ ...map, [key]: value }));
    this.searchScrollState.set(value);
  }
}
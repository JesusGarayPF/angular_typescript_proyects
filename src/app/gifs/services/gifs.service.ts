import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from './mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {

    private http = inject(HttpClient);
    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(false);
    trendingGifGroup = computed<Gif[][]>(() => {
        const groups: Gif[][] = [];
        const list = this.trendingGifs();
        for (let i = 0; i < list.length; i += 3) groups.push(list.slice(i, i + 3));
        return groups;
    });
    private trendingPage = signal(0);

    searchHistory = signal<Record<string, Gif[]>>(this.loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
    searchHistoryLoading = signal(false);
    currentQuery = signal<string>('');
    private searchPages = signal<Record<string, number>>({});

    searchGifGroup = computed<Gif[][]>(() => {
        const groups: Gif[][] = [];
        const list = this.searchHistory()[this.currentQuery()] ?? [];
        for (let i = 0; i < list.length; i += 3) groups.push(list.slice(i, i + 3));
        return groups;
    });

    constructor() { this.loadTrendingGifs(); }

    loadTrendingGifs() {
        if (this.trendingGifsLoading()) return;
        this.trendingGifsLoading.set(true);
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                offset: (this.trendingPage() * 20).toString(),
            },
        }).subscribe((response) => {
            const gifs = GifMapper.mapGiphyItemToGifArray(response.data);
            this.trendingGifs.update(curr => [...curr, ...gifs]);
            this.trendingGifsLoading.set(false);
            this.trendingPage.update(p => p + 1);
        });
    }

    searchGifs(query: string): Observable<Gif[]> {
        const q = query.trim().toLowerCase();
        const pageMap = this.searchPages();
        const page = pageMap[q] ?? 0;

        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                q,
                limit: 20,
                offset: (page * 20).toString(),
            },
        }).pipe(
            map(({ data }) => GifMapper.mapGiphyItemToGifArray(data)),
            tap(items => {
                this.searchHistory.update(hist => ({
                    ...hist,
                    [q]: [...(hist[q] ?? []), ...items],
                }));
                this.searchPages.update(pages => ({ ...pages, [q]: page + 1 }));
            })
        );
    }
    getGifsHistory(query: string): Gif[] {
        return this.searchHistory()[query.toLowerCase()] ?? [];
    }

    setCurrentQuery(q: string) { this.currentQuery.set(q.trim().toLowerCase()); }

    saveToLocalStorage = effect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
    });

    loadFromLocalStorage(): Record<string, Gif[]> {
        const history = localStorage.getItem('searchHistory');
        return history ? JSON.parse(history) as Record<string, Gif[]> : {};
    }
}

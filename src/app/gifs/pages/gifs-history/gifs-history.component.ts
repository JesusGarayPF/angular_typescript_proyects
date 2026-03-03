import { AfterViewInit, Component, ElementRef, inject, viewChild, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-gifs-history',
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent implements AfterViewInit {

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(p => (p['query'] ?? '').trim().toLowerCase())),
    { initialValue: '' }
  );
  gifsByKey = computed(() => this.gifService.getGifsHistory(this.query()));
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    if (!this.query()) return;
    this.gifService.currentQuery.set(this.query());
    if (this.gifService.getGifsHistory(this.query()).length === 0) {
      this.gifService.searchGifs(this.query()).subscribe();
    }
    const el = this.scrollDivRef()?.nativeElement;
    if (el) el.scrollTop = this.scrollStateService.getSearchScrollState(this.query());
  }

  querySync = effect(() => {
    const q = this.query();
    if (!q) return;
    this.gifService.setCurrentQuery(q);
  });

  onScroll(event: Event) {
    const el = this.scrollDivRef()?.nativeElement;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const clientHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.setSearchScrollState(this.query(), scrollTop);
    if (isAtBottom) {
      this.gifService.searchGifs(this.query()).subscribe();
    }
  }
}

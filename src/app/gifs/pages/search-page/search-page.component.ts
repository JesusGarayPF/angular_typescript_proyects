import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
//import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'app-search-page',
  //imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.searchScrollState();
  }

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    const q = query.trim().toLowerCase();
    this.gifService.currentQuery.set(q);
    this.gifService.searchGifs(q).subscribe(() => {
      this.gifs.set(this.gifService.getGifsHistory(q));
    });
  }

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.searchScrollState.set(scrollTop);
    console.log({ isAtBottom });
    console.log('scrollDivRef()', this.scrollDivRef());
    if (isAtBottom) {
      this.gifService.searchGifs(this.gifService.currentQuery()).subscribe();
    }
  }
}

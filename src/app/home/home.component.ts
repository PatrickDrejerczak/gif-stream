import { Component, inject } from '@angular/core';
import { GifListComponent } from './ui/gif-list/gif-list.component';
import { RedditService } from '../shared/data-access/reddit.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    GifListComponent,
    InfiniteScrollDirective,
    SearchBarComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  redditService = inject(RedditService);
}

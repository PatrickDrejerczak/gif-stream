import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RedditService } from './shared/data-access/reddit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  redditService = inject(RedditService);
  snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const error = this.redditService.error();

      if (error !== null) {
        this.snackBar.open(error, 'Dismiss', { duration: 2000 });
      }
    });
  }
}

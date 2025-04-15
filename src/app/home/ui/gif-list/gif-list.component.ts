import { Component, input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WINDOW } from '../../../shared/utils/injection-token';
import { Gif } from '../../../shared/interfaces';
import { GifPlayerComponent } from '../gif-player/gif-player.component';

@Component({
  selector: 'app-gif-list',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    GifPlayerComponent,
  ],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.scss',
})
export class GifListComponent {
  gifs = input.required<Gif[]>();
  window = inject(WINDOW);
}

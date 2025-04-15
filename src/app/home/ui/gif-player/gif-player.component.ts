import {
  Component,
  ElementRef,
  input,
  viewChild,
  computed,
  signal,
  effect,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fromEvent, Subject, switchMap } from 'rxjs';

interface GifPlayerState {
  playing: boolean;
  status: 'initial' | 'loading' | 'loaded';
}

@Component({
  selector: 'app-gif-player',
  imports: [MatProgressSpinnerModule],
  templateUrl: './gif-player.component.html',
  styleUrl: './gif-player.component.scss',
})
export class GifPlayerComponent {
  src = input.required<string>();
  thumbnail = input.required<string>();

  videoElement = viewChild.required<ElementRef<HTMLVideoElement>>('gifPlayer');
  videoElement$ = toObservable(this.videoElement);

  state = signal<GifPlayerState>({
    playing: false,
    status: 'initial',
  });

  //selectors
  playing = computed(() => this.state().playing);
  status = computed(() => this.state().status);

  // sources
  togglePlay$ = new Subject<void>();
  videoLoadStart$ = this.togglePlay$.pipe(
    switchMap(() => this.videoElement$),
    switchMap(({ nativeElement }) => fromEvent(nativeElement, 'loadstart'))
  );

  videoLoadComplete$ = this.videoElement$.pipe(
    switchMap(({ nativeElement }) => fromEvent(nativeElement, 'loadeddata'))
  );

  constructor() {
    //reducers
    this.videoLoadStart$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'loading' }))
      );

    this.videoLoadComplete$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'loaded' }))
      );

    this.togglePlay$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, playing: !state.playing }))
      );

    effect(() => {
      const { nativeElement: video } = this.videoElement();
      const playing = this.playing();
      const status = this.status();

      if (!video) return;

      if (playing && status === 'initial') {
        video.load();
      }

      if (status === 'loaded') {
        playing ? video.play() : video.pause();
      }
    });
  }
}

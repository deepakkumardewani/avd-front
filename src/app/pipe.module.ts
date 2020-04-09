import { NgModule } from '@angular/core';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [],
  declarations: [
    ShortNumberPipe,
    DurationPipe,
    DateAgoPipe,
    ShortenPipe
  ],
  exports: [
    ShortNumberPipe,
    DurationPipe,
    DateAgoPipe,
    ShortenPipe
  ]
})
export class PipeModule {}

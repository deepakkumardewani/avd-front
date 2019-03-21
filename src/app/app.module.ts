
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { AboutComponent } from './about/about.component';

import { ShortenPipe } from './shorten.pipe';

import {
  LecturesComponent,
  AudioDialogComponent
} from './lectures/lectures.component';
import { BooksComponent } from './books/books.component';


import { HelperService } from './helper.service';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    EventsComponent,
    EventDetailComponent,
    ContactComponent,
    HomeComponent,
    ApplicationComponent,
    AboutComponent,
    LecturesComponent,
    AudioDialogComponent,
    BooksComponent,
    QuotesComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    SwiperModule,
    HttpClientModule,
    NgxGalleryModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    HelperService
  ],
  entryComponents: [AudioDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

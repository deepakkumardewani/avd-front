import { QuotesComponent } from './quotes/quotes.component';
import { AboutComponent } from './about/about.component';
import { ApplicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LecturesComponent } from './lectures/lectures.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {title: 'Home'} },
  { path: 'about', component: AboutComponent, data: {title: 'About'} },
  { path: 'quotes', component: QuotesComponent, data: {title: 'Quotes'} },
  { path: 'events', component: EventsComponent, data: {title: 'Events'} },
  { path: 'events/:name', component: EventDetailComponent, data: {title: 'EventDetail'} },
  { path: 'gallery', component: GalleryComponent, data: {title: 'Gallery'} },
  { path: 'application', component: ApplicationComponent, data: {title: 'Application'} },
  { path: 'contact', component: ContactComponent, data: {title: 'Contact'} },
  { path: 'lectures', component: LecturesComponent, data: {title: 'Lectures'} },
  { path: 'lectures/audio', component: LecturesComponent, data: {title: 'Lectures'} },
  { path: 'lectures/video', component: LecturesComponent, data: {title: 'Lectures'} },
  { path: 'lectures/video/:id', component: LecturesComponent, data: {title: 'Lectures'} },
  { path: 'books', component: BooksComponent, data: {title: 'Books'} },
  { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

const { YOUTUBE_KEY, PLAYLIST_ID } = environment;


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  dailyDarshanUrl = `${environment.serverUrl}/photos/dailyDarshan`;
  dailyAudioUrl = `${environment.serverUrl}/lectures/audio/daily`;
  allAudioUrl = `${environment.serverUrl}/lectures/audio`;
  videoUrl = `${environment.serverUrl}/lectures/video`;
  dailVideoUrl = `${environment.serverUrl}/lectures/video/daily`;
  quotesUrl = `${environment.serverUrl}/quotes`;
  eventsUrl = `${environment.serverUrl}/events`;
  upcomingEventsUrl = `${environment.serverUrl}/events?limit=3`;
  contactUsUrl = `${environment.serverUrl}/contact`;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getDailyDarshan() {
    return this.http.get(this.dailyDarshanUrl);
  }

  getDailyAudio() {
    return this.http.get(this.dailyAudioUrl);
  }

  getAllAudio(page?: number) {
    if (page) {
      return this.http.get(`${this.allAudioUrl}?page=${page}`);
    }
    // return this.http.get(this.allAudioUrl);
  }

  getQuotes() {
    return this.http.get(this.quotesUrl);
  }

  getEvents() {
    return this.http.get(this.eventsUrl);
  }

  getUpcomingEvents() {
    return this.http.get(this.upcomingEventsUrl);
  }

  getVideoList(token: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.videoUrl, { token });
    // return this.http.get(`${environment.youtubeUrl}playlistItems?part=snippet,contentDetails&maxResults=30&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_KEY}`, { token });
  }

  getDailyVideo() {
    return this.http.get(this.dailVideoUrl);
  }

  getVideoById(id: string) {
    return this.http.get(`${environment.youtubeUrl}videos?part=snippet,contentDetails,statistics&key=${YOUTUBE_KEY}&id=${id}`);
  }

  getEvent() {
    if (window.localStorage) {
      return JSON.parse(localStorage.getItem('event'));
    }
  }

  setEvent(event) {
    if (window.localStorage) {
      localStorage.setItem('event', JSON.stringify(event));
    }
  }


  clearEvent() {
    if (window.localStorage) {
      localStorage.removeItem('event');
    }
  }

  filterYoutubeVideoUrl(id) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
  }

  submitContactUs(data) {
    return this.http.post(this.contactUsUrl, {data});
  }
}

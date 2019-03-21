import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  catchError
} from 'rxjs/operators';


import { environment } from 'src/environments/environment';

const { YOUTUBE_KEY, PLAYLIST_ID } = environment;


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  dailyDarshanUrl = `${environment.serverUrl}/photos/dailyDarshan`;
  dailyAudioUrl = `${environment.serverUrl}/lectures/audio/daily`;
  allAudioUrl = `${environment.serverUrl}/lectures/audio`;
  quotesUrl = `${environment.serverUrl}/quotes`;
  eventsUrl = `${environment.serverUrl}/events`;
  upcomingEventsUrl = `${environment.serverUrl}/events?limit=3`;

  constructor(private http: HttpClient) { }

  getDailyDarshan() {
    return this.http.get(this.dailyDarshanUrl);
  }

  getDailyAudio() {
    return this.http.get(this.dailyAudioUrl);
  }

  getAllAudio() {
    return this.http.get(this.allAudioUrl);
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

  getVideoList() {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.youtubeUrl}playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_KEY}`);
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
}

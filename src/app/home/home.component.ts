import { HelperService } from './../helper.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { config } from '../config';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  assetPath = '../../assets/banner-images/';
  bannerImages = ['SMB.jpg', 'RVC.jpg', 'Gaur-Nitai.jpg', 'Jagannath.jpg'];
  darshanImages = [];
  bannerConfig: SwiperConfigInterface = config.swiper.banner;

  audioData: any;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  upcomingEvents: any;

  @ViewChild('audio') audio: ElementRef;

  constructor(
    private helper: HelperService,
    private router: Router
    ) {}

  ngOnInit() {
    this.audio.nativeElement.controls = true;
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          thumbnailsColumns: 5,
          thumbnailsPercent: 10,
          // thumbnailsMargin: 10,
          // thumbnailMargin: 10,
          thumbnailsArrowsAutoHide: true,
          imageAnimation: NgxGalleryAnimation.Fade,
          previewFullscreen: true,
          previewKeyboardNavigation: true
      }
  ];

    this.helper.getDailyDarshan().subscribe(result => {
      this.darshanImages = result[0].imageUrls.map(url => {
        return {
          small: url, medium: url, big: url
        };
      });
    });

    this.helper.getDailyAudio().subscribe(result => {
      this.audioData = result;
      this.audio.nativeElement.src = this.audioData.url;
    });

    this.helper.getUpcomingEvents().subscribe(result => {
      this.upcomingEvents = result;
      console.log(this.upcomingEvents);

    });
  }

  goToDetail(event) {
    const name = event.title.toLowerCase().replace(' ', '-');
    this.router.navigate([`/events/${name}`],  { queryParams: {  ...event }});
  }
}

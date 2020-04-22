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

  assetPath = 'assets/banner-images/';
  bannerImages = ['SMB.jpg', 'RVC-1.jpg', 'Gaur-Nitai-1.jpg'];
  darshanImages = [];
  bannerConfig: SwiperConfigInterface = config.swiper.banner;

  audioData: any;
  videoUrl: any;

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
          thumbnailsPercent: 20,
          // thumbnailsMargin: 10,
          // thumbnailMargin: 10,
          thumbnailsArrowsAutoHide: true,
          imageAnimation: NgxGalleryAnimation.Fade,
          previewFullscreen: true,
          previewKeyboardNavigation: true
      },
      // max-width 800
      {
          breakpoint: 800,
          imageSwipe: true,
          width: '100%',
          height: '300px',
          // imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsColumns: 4,
          // thumbnailsMargin: 20,
          // thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: true
      }
  ];

    this.helper.getDailyDarshan().subscribe((result: any) => {
      this.darshanImages = result.imageUrls.map(image => {
        return {
          small: image.url, medium: image.url, big: image.url
        };
      });
    });

    this.helper.getDailyAudio().subscribe(result => {
      this.audioData = result;
      this.audio.nativeElement.src = this.audioData.url;
    });

    this.helper.getDailyVideo().subscribe((result: any) => {
      this.videoUrl = this.helper.filterYoutubeVideoUrl(result.video.id);

    });

    // this.helper.getUpcomingEvents().subscribe(result => {
    //   this.upcomingEvents = result;
    // });
  }

  goToDetail(event) {
    const name = event.title.toLowerCase().replace(' ', '-');
    this.router.navigate([`/events/${name}`],  { queryParams: {  ...event }});
  }
}

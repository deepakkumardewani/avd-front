import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { HelperService } from './../helper.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

export interface AudioDialogData {
  title: string;
  subTitle: string;
  url: string;
}
export interface VideoDialogData {
  url: string;
}
/**
 * @Component AudioDialogComponent
 */

@Component({
  selector: 'audio-dialog',
  templateUrl: 'audio-dialog.html',
  styles: [
    'mat-card { width: 100%; height: 200px; }',
  ]
})
export class AudioDialogComponent implements OnInit {
  @ViewChild('audio') audio: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<AudioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AudioDialogData
  ) {}

  ngOnInit() {
    this.audio.nativeElement.controls = true;
    this.audio.nativeElement.src = this.data.url;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'video-dialog',
  templateUrl: 'video-dialog.html',
  styles: [
    `
    mat-card { width: 100%; height: 400px; }
    .yt-video { text-align: center }`,
  ]
})
export class VideoDialogComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  constructor(
    public audioDialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VideoDialogData
  ) {}

  ngOnInit() {
    // this.audio.nativeElement.controls = true;
    // this.audio.nativeElement.src = this.data.url;
  }
  onNoClick(): void {
    this.audioDialogRef.close();
  }
}


// interface Audio {
//   title: string;
//   subTitle: string;
//   url: string;
// }

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {

  audios: any;
  videos: any;

  audioLoading = true;
  videoLoading = true;

  videoIdArray: [any];
  videoTotal: number;
  audioTotal: number;
  loading: boolean;

  audioPage = 1;
  videoPage = 1;

  token = '';

  isMobile: boolean;

  constructor(
    private helper: HelperService,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService
    ) {}

  async ngOnInit() {
    // this.loading = true;
    this.isMobile = this.deviceService.isMobile();
    this.getPage(1, 'audio');
    this.getPage(1, 'video');
    // this.getVideos();
    // this.helper.getVideoList().subscribe((result: any) => {
    //   this.videos = result.items;
    //   this.videoIdArray = this.videos.map(video => {
    //     return video.snippet.resourceId.videoId;
    //   });

    //   this.helper.getVideoById(this.videoIdArray.join(',')).subscribe((response: any) => {
    //     this.videos = response.items.map(video => {
    //         return {
    //       title: video.snippet.title,
    //       thumbnail: video.snippet.thumbnails.medium.url,
    //       videoUrl: this.videoURL(video.id),
    //       viewCount: video.statistics.viewCount,
    //       duration: video.contentDetails.duration,
    //       publishedAt: video.snippet.publishedAt
    //     };
    //     });
    //   });
    // });
  }

  getPage(page: number, type: string) {
    // this.loading = true;
    if (type === 'audio') {
      this.helper.getAllAudio(page).subscribe((res: any) => {
        this.audioLoading = false;
        this.audios = res.docs;
        this.audioTotal = res.total;
        this.audioPage = page;
        // this.loading = false;
      });
    }
    if (type === 'video') {
      this.videoLoading = true;
      this.getVideos();
      this.videoPage = page;
    }
}

  videoURL(videoId) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  getVideos() {
    this.helper.getVideoList(this.token).subscribe((result: any) => {
      this.token = result.token;
      this.videoTotal = result.totalResults;
      this.videos = result.videos;
      this.videoLoading = false;

      // this.videoIdArray = this.videos.map(video => {
      //   return video.snippet.resourceId.videoId;
      // });

      // this.helper.getVideoById(this.videoIdArray.join(',')).subscribe((response: any) => {
      //   this.videoLoading = false;
      //   console.log(this.videoLoading);

      //   this.videos = response.items.map(video => {
      //       return {
      //     title: video.snippet.title,
      //     thumbnail: video.snippet.thumbnails.medium.url,
      //     videoUrl: this.helper.filterYoutubeVideoUrl(video.id),
      //     viewCount: video.statistics.viewCount,
      //     duration: video.contentDetails.duration,
      //     publishedAt: video.snippet.publishedAt
      //   };
      //   });
      //   console.log(this.videos);

      // });
    });
  }
  openDialog(data, type): void {
    if (type === 'audio') {
      const dialogRef = this.dialog.open(AudioDialogComponent, {
        width: '600px',
        height: '180px',
        data: { title: data.title, subTitle: data.subTitle, url: data.url },
        hasBackdrop: true,
        panelClass: 'audio-dialog'
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
    }

    if (type === 'video') {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        width: '500px',
        height: '400px',
        data: { url: this.helper.filterYoutubeVideoUrl(data.id) },
        hasBackdrop: true,
        panelClass: 'video-dialog'
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
    }

  }
}

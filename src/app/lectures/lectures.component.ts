import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { HelperService } from './../helper.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { environment } from 'src/environments/environment';

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
  selectedIndex = 0;

  constructor(
    private helper: HelperService,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  async ngOnInit() {
    this.location.replaceState('/lectures/audio');
    this.isMobile = this.deviceService.isMobile();
    this.getPage(1, 'audio');
    this.getPage(1, 'video');

    if (!this.router.url.includes('/audio') && !this.router.url.includes('/video')) {
      this.location.replaceState('/lectures/audio');
    }

    if (this.router.url.includes('/audio')) {
      this.selectedIndex = 0;
    } else if (this.router.url.includes('/video')) {
      this.location.replaceState('/lectures/video');
      this.selectedIndex = 1;
      this.route.params.subscribe(params => {
        if (params && params.id) {
          const data = { id: params.id };
          this.openDialog(data, 'video');
        }
      });
    }
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

  copyLink(id) {
    const url = `${environment.domainUrl}/lectures/video/${id}`;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onTabChanged(event) {
    if (event.index === 0) {
      this.location.replaceState('/lectures/audio');
    } else {
      this.location.replaceState('/lectures/video');
    }
  }
}

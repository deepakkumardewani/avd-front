import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { HelperService } from './../helper.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export interface DialogData {
  title: string;
  subTitle: string;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.audio.nativeElement.controls = true;
    this.audio.nativeElement.src = this.data.url;
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  videoIdArray: [String];

  page = 1;

  constructor(
    private helper: HelperService,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer
    ) {}

  async ngOnInit() {
    this.helper.getAllAudio().subscribe((result) => {
      this.audios = result;
    });

    this.helper.getVideoList().subscribe((result: any) => {
      this.videos = result.items;

      this.videoIdArray = this.videos.map(video => {
        return video.snippet.resourceId.videoId;
      });

      this.helper.getVideoById(this.videoIdArray.join(',')).subscribe((response: any) => {
        this.videos = response.items.map(video => {
            return {
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url,
          videoUrl: this.videoURL(video.id),
          viewCount: video.statistics.viewCount,
          duration: video.contentDetails.duration
        };
        });
      });
    });


  }


  videoURL(videoId) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  openDialog(audio): void {
    const dialogRef = this.dialog.open(AudioDialogComponent, {
      width: '600px',
      height: '180px',
      data: { title: audio.title, subTitle: audio.subTitle, url: audio.url },
      hasBackdrop: true,
      panelClass: 'audio-dialog'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}

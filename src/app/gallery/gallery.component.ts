import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  albums: any;
  constructor() { }

  ngOnInit() {
    this.albums = [
      {
        title: 'Album-1'
      },
      {
        title: 'Album-2'
      },
      {
        title: 'Album-3'
      },
      {
        title: 'Album-4'
      },
      {
        title: 'Album-5'
      },
      {
        title: 'Album-6'
      }
    ];
  }

}

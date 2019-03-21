import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event: any;
  constructor(private route: ActivatedRoute, private helperService: HelperService) {}

  ngOnInit() {
    this.event = this.helperService.getEvent();

    // this.route.queryParams.subscribe(params => {
    //   this.event = params;
    //   console.log(params);
    // });
  }
}

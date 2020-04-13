import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}
  title = 'avd-front';

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          $('.navbar-collapse').collapse('hide');
      }
  });
    // $('.navbar-nav>li>a').on('click', function() {
    //   $('.navbar-collapse').collapse('hide');
    // });
  }

}

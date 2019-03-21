import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  quotes: any;

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getQuotes().subscribe(result => {
      this.quotes = result;
    });
  }

}

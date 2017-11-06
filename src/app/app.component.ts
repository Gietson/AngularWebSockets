import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs/Subscription';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentNumber: number;
  sub: Subscription;

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //this.initChart();

    this.sub = this.dataService.getMessages()
      .subscribe(q => {
        this.currentNumber = q;
        this.chart.addPoint(q);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

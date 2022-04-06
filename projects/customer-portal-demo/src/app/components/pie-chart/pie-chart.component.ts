import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() setHeight = 130;
  @Input() setWidth = 400;
  @Input() chartInputData;
  isHomePage: boolean;
  // colors: Color[] = ["#118AB2","#F7B32B","#4DAA57"];
  chartOptions = {
    cutoutPercentage: 75,
    responsive: false,
    maintainAspectRatio: false,
    legend: {
      position: 'left',
      rtl: true,
      align: 'start',
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        fontSize: 18,
        padding: 15
      },
    }
  };
  data = {};
  
  constructor(private router: Router) { }

/*
    // Doughnut
    public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: MultiDataSet = [
      // [350, 450, 100],
      // [50, 150, 120],
      // [250, 130, 70],
      [300, 500, 250]
    ];
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
      beforeDraw(chart) {
        const ctx = chart.ctx;
        const txt = 'Center Text';
  
        //Get options from the center object in options
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart['innerRadius'] * 2)
  
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
  
        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = (chart['innerRadius'] * 2) - sidePaddingCalculated;
  
        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart['innerRadius'] * 2);
  
        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = Math.min(newFontSize, elementHeight);
  
        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'blue';
  
        // Draw text in center
        ctx.fillText('Center Text', centerX, centerY);
      }
    }];
  */
  ngOnChanges(changes: SimpleChanges): void {
      this.data = this.chartInputData;
      if (this.router.url === '/') {
        this.isHomePage = true;
      } else {
        this.isHomePage = false;
      }
  }

  ngOnInit(): void {

  }



}

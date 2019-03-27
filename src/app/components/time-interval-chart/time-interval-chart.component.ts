import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

export interface ChartDataRow {
  title: string;
  from: Date;
  to: Date;
  color: string;
}

export interface LegendRow {
  title: string;
  color: string;
}

@Component({
  selector: 'app-d3-bar-chart',
  templateUrl: './time-interval-chart.component.html',
  styleUrls: ['./time-interval-chart.component.scss']
})
export class TimeIntervalChartComponent implements OnInit, OnChanges {

  @Input() data: ChartDataRow[];
  @Input() legend: LegendRow[] = [];
  @ViewChild('chart') chartContainer;

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(): void {
    this.init();
  }

  init() {
    if (this.data && this.data.length) {
      const chartContainer = this.chartContainer.nativeElement;
      const margin = {top: 20, right: 30, bottom: 40, left: 30};

      const containerWidth = chartContainer.clientWidth;
      const containerHeight = chartContainer.clientHeight;

      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      const chart = d3.select(chartContainer)
        .html('')
        .attr('width', containerHeight)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const x = d3.scaleTime()
        .range([0, width])
        .domain([
          d3.min(this.data, d => d.from),
          d3.max(this.data, d => d.to)
        ]);

      const y = d3.scaleBand()
        .rangeRound([0, height])
        .domain(this.data.map((d,i) => '' + i));

      const dateTimeFormatOptions = {month: 'short', day: 'numeric'};
      const xAxis = d3.axisBottom(x)
        .tickFormat(d => Intl.DateTimeFormat('en-us', dateTimeFormatOptions).format(d as Date));

      chart.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 9)
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');

      chart.selectAll('.bar')
        .data(this.data)
        .enter().append('rect')
        .style('fill', d => d.color)
        .attr('x', d => x(d.from))
        .attr('y', (d,i) => y('' + i))
        .attr('width', d => x(d.to) - x(d.from))
        .attr('height', y.step() - 1)
        .append('title')
        .text(d => d.title);

      this.legend.forEach((row, index) => {
        chart.append('text')
          .attr('x',  15)
          .attr('y', 10 + 30 * index)
          .text(row.title);
        chart.append('rect')
          .attr('x', 0)
          .attr('y', 30 * index)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', row.color);
      });
    }
  }
}


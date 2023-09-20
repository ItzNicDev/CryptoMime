import {Component, OnInit} from '@angular/core';


import * as echarts from 'echarts';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {

  public options: any;

  constructor() {
  }

  async ngOnInit() {

    const chartElement = document.getElementById('echarts-container');
    const myChart = echarts.init(chartElement);

    // Define your chart options and data here

    let base = +new Date(1968, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let date = [];

    let data = [Math.random() * (100 - 1 + 1) + 1];

    for (let i = 1; i < 500; i++) {
      var now = new Date((base += oneDay));
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      data.push(Math.round((Math.random() - 0.5) * 10 + data[i - 1]));
    }


    this.options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt:any) {
          return [pt[0], '30%'];
        }
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: true,
        data: date
      },
      yAxis: {
        thickness: 0.1,
        label: false,
        show: false,
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },

      ],
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(109,196,43)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(135,229,83)'
              },
              {
                offset: 1,
                color: 'rgba(104,196,78,0.29)'
              }
            ])
          },
          data: data
        }
      ]
    };

   await myChart.setOption(this.options);
  }

}

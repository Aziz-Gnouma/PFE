import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AppServiceService } from '../Services/app-service.service';
import * as $ from 'jquery';
import 'flot';
import { Chart } from 'chart.js'; // Import Chart.js library

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    public AppServiceService: AppServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.renderFlotChart();
    this.renderFlotThresholdsChart();
    this.renderSmoothPyramidChart();
}


  public isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  public logout() {
    this.AuthService.clear();
    this.router.navigate(['']);
  }
  private renderFlotThresholdsChart(): void {
    const data = [
        { data: [[0, 1], [1, 3], [2, 8], [3, 5], [4, 13]], threshold: { below: 5, color: 'red' } },
        { data: [[0, 12], [1, 6], [2, 3], [3, 9], [4, 11]], threshold: { below: 10, color: 'yellow' } }
    ];

    const options: any = {
        series: {
            lines: { show: true },
            threshold: { below: 0, color: 'red' }
        },
        grid: { hoverable: true, clickable: true },
        yaxis: { min: 0, max: 15 },
        colors: ['#1ab394', '#464f88']
    };

    // Iterate over each flotThresholds element
    $('.flotThresholds').each(function () {
        const $this = $(this);
        const plotData = $this.data('plotData');
        const plotOptions = $this.data('plotOptions');

        // Clear existing content
        $this.empty();

        // Iterate through data and create HTML elements
        data.forEach(series => {
            const seriesContainer = $('<div class="flot-series"></div>');

            series.data.forEach(point => {
                const dataPoint = $('<div class="flot-point"></div>');
                dataPoint.css('left', point[0] + 'px');
                dataPoint.css('bottom', point[1] + 'px');
                seriesContainer.append(dataPoint);
            });

            // Apply threshold styling
            if (series.threshold) {
                seriesContainer.find('.flot-point').each(function () {
                    if ($(this).position().top > series.threshold.below) {
                        $(this).addClass('above-threshold');
                        $(this).css('background-color', series.threshold.color);
                    }
                });
            }

            $this.append(seriesContainer);
        });
    });
}


private renderFlotChart(): void {
    const data = [
      {
        label: "Growth Actual",
        data: [
          [0, 105], [1, 120], [2, 125], [3, 130], [4, 135], [5, 140], [6, 145],
          [7, 135], [8, 130], [9, 125], [10, 120], [11, 115], [12, 105], [13, 100],
          [14, 95], [15, 90], [16, 85], [17, 80], [18, 75], [19, 70], [20, 65],
          [21, 60], [22, 55], [23, 50], [24, 45], [25, 40], [26, 35], [27, 30],
          [28, 25], [29, 20], [30, 15], [31, 10], [32, 5], [33, 0],
        ],
        color: "#6383F1"
      },
      {
        label: "Plan",
        data: [
          [0, 55], [1, 60], [2, 65], [3, 70], [4, 75], [5, 80], [6, 85],
          [7, 90], [8, 95], [9, 100], [10, 105], [11, 110], [12, 115],
          [13, 120], [14, 125], [15, 130], [16, 135], [17, 140], [18, 145],
          [19, 150], [20, 155], [21, 160], [22, 165], [23, 170], [24, 175],
          [25, 180], [26, 185], [27, 190], [28, 195], [29, 200], [30, 205],
          [31, 210], [32, 215], [33, 220],
        ],
        color: "#7E4FFB"
      }
    ];

    // Clear existing chart container
    $('#flotChart').empty();

    // Iterate through data and create HTML elements
    data.forEach(series => {
        const seriesContainer = $('<div class="flot-series"></div>');

        series.data.forEach(point => {
            const dataPoint = $('<div class="flot-point"></div>');
            dataPoint.css('left', point[0] + 'px');
            dataPoint.css('bottom', point[1] + 'px');
            seriesContainer.append(dataPoint);
        });

        $('#flotChart').append(seriesContainer);
    });
}
renderSmoothPyramidChart(): void {
  const data = [
    {
      label: "Growth Actual",
      data: [
        [0, 105], [1, 120], [2, 125], [3, 130], [4, 135], [5, 140], [6, 145],
        [7, 135], [8, 130], [9, 125], [10, 120], [11, 115], [12, 105], [13, 100],
        [14, 95], [15, 90], [16, 85], [17, 80], [18, 75], [19, 70], [20, 65],
        [21, 60], [22, 55], [23, 50], [24, 45], [25, 40], [26, 35], [27, 30],
        [28, 25], [29, 20], [30, 15], [31, 10], [32, 5], [33, 0],
      ],
      color: "#6383F1"
    },
    {
      label: "Plan",
      data: [
        [0, 55], [1, 60], [2, 65], [3, 70], [4, 75], [5, 80], [6, 85],
        [7, 90], [8, 95], [9, 100], [10, 105], [11, 110], [12, 115],
        [13, 120], [14, 125], [15, 130], [16, 135], [17, 140], [18, 145],
        [19, 150], [20, 155], [21, 160], [22, 165], [23, 170], [24, 175],
        [25, 180], [26, 185], [27, 190], [28, 195], [29, 200], [30, 205],
        [31, 210], [32, 215], [33, 220],
      ],
      color: "#7E4FFB"
    }
  ];

  const options = {
    series: {
      lines: {
        show: true,
        lineWidth: 2,
        fill: true,
        fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.2 }] }
      },
      points: {
        show: true,
        radius: 5,
        fillColor: '#ffffff',
        lineWidth: 2
      }
    },
    grid: {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      hoverable: true
    },
    xaxis: {
      tickDecimals: 0
    },
    yaxis: {
      min: -30,
      max: 240
    },
    colors: ['#4CAF50']
  };

  ($ as any).plot('#smoothPyramidChart', data, options);
}
}

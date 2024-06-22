import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SanctionsRecompencesService } from 'src/app/Services/sanctions-recompences.service';
import { Employee } from 'src/app/Employee';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { Chart } from 'chart.js'; // Import Chart.js library
import 'jquery'; // Import jQuery
import 'flot'; // Import Flot

@Component({
  selector: 'app-dashboard-rh',
  templateUrl: './dashboard-rh.component.html',
  styleUrls: ['./dashboard-rh.component.css']
})

export class DashboardRHComponent implements OnInit {
  enterpriseName: string = '';
  Employees: Employee[] = [];
  newUsersCount: any;
  Formationsnumber: number | undefined;
  totalSanctionsNumber: number | undefined;
  totalRewardsNumber: number | undefined;

  constructor(
    private appService: AppServiceService,
    private sanctionsRecompencesService: SanctionsRecompencesService,
    private route: ActivatedRoute,
    private router: Router,
    public AppServiceService: AppServiceService
  ) {}

  ngOnInit(): void {
    this.renderChartJS();
    this.renderFlotChart();
    this.renderSmoothPyramidChart();

    const storedEnterpriseName = localStorage.getItem('enterpriseName');

    if (storedEnterpriseName !== null) {
      this.enterpriseName = storedEnterpriseName;
      console.log('Enterprise Name:', this.enterpriseName);
    } else {
      console.error('Enterprise Name not found in local storage.');
    }
    this.getNewUsers();
    this.getFormations(this.enterpriseName);
    this.getTotalSanctions(this.enterpriseName);
    this.getTotalRewards(this.enterpriseName)
  }

  getNewUsers(): void {
    console.log(this.enterpriseName);
    const NomEntreprise = this.enterpriseName;
    this.appService.getAllEmployes(NomEntreprise).subscribe((data: Employee[]) => {
      this.Employees = data;
      this.newUsersCount = this.Employees.length;
    });
  }

  getFormations(enterpriseName: string): void {
    this.appService.getFormations(enterpriseName).subscribe((data: any[]) => {
      this.Formationsnumber = data.length;
    });
  }

  goToAllEmployees() {
    this.router.navigate(['/allEmployees']);
  }

  getTotalSanctions(enterpriseName: string): void {
    this.sanctionsRecompencesService.getALLtotalSanctions(enterpriseName).subscribe((data: any) => {
      this.totalSanctionsNumber = data;
    });
  }

  getTotalRewards(enterpriseName: string): void {
    this.sanctionsRecompencesService.getALLtotalRewards(enterpriseName).subscribe((data: any) => {
      this.totalRewardsNumber = data;
    });
  }

  renderChartJS(): void {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverRadius: 6,
        tension: 0.4
      }]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
  }
  renderFlotChart(): void {
    const data = [
      [0, 65],
      [1, 59],
      [2, 80],
      [3, 81],
      [4, 56],
      [5, 55],
      [6, 40]
    ];

    const options = {
      series: {
        lines: {
          show: true,
          lineWidth: 2, // Line width
          fill: true, // Fill under the line for smooth curves
          fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.2 }] } // Adjust opacity for smoother curves
        },
        points: {
          show: true,
          radius: 5, // Point radius
          fillColor: '#ffffff', // Point fill color
          lineWidth: 2 // Point border width
        }
      },
      grid: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)', // Grid border color
        hoverable: true
      },
      xaxis: {
        tickDecimals: 0 // Remove decimals from x-axis ticks
      },
      yaxis: {
        min: 0 // Minimum value for y-axis
      },
      colors: ['#4CAF50'] // Line color
    };

    ($ as any).plot('#flotThresholds', [data], options);
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

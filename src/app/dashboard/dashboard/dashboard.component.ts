import { Component, OnInit } from '@angular/core';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latestScore: number | null = null;
  latestScoreRating: string = 'N/A';
  totalFinancialData: number = 0;
  financialData: FinancialDataDto[] = [];
  scoreProgressChart: any;

  constructor(private financialDataService: FinancialDataService) {}

  ngOnInit(): void {
    this.loadFinancialData();
  }

  // Convert score to rating
  getRatingFromScore(score: number): string {
    if (score >= 0.875) return 'AAA';
    if (score >= 0.75) return 'AA';
    if (score >= 0.625) return 'A';
    if (score >= 0.5) return 'BBB';
    if (score >= 0.375) return 'BB';
    if (score >= 0.25) return 'B';
    if (score >= 0.125) return 'CCC/CC/C';
    return 'D';
  }

  loadFinancialData(): void {
    this.financialDataService.getAllFinancialData().subscribe(
      (data: FinancialDataDto[]) => {
        this.financialData = data;
        this.totalFinancialData = data.length;

        // Get the latest credit score
        if (data.length > 0) {
          const latestEntry = data[data.length - 1]; // Assuming the latest entry is at the end
          this.latestScore = latestEntry.score;
          this.latestScoreRating = this.getRatingFromScore(this.latestScore || 0);
        }

        // Initialize the score progress chart
        this.initScoreProgressChart();
      },
      (error) => {
        console.error('Error fetching financial data:', error);
      }
    );
  }

  initScoreProgressChart(): void {
    const scores = this.financialData.map(entry => entry.score);
    const labels = this.financialData.map((_, index) => `Entry ${index + 1}`);

    this.scoreProgressChart = new Chart('chartTimeline', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Score Progress',
            data: scores,
            borderColor: '#3444d5',
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Entries'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Score'
            },
            beginAtZero: true,
            max: 1
          }
        }
      }
    });
  }
}
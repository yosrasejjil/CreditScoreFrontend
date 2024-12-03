import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { FinancialDataService } from 'src/app/services/financial-data.service';
import { FinancialDataDto } from 'src/app/shared/models/FinancialDataDto';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  financialData: FinancialDataDto[] = [];
  rating?: number;
  lastPrediction: number | null = null;
  totalEntries: number = 0;
  userId: string | null = null;
  ratingLabel: string = '';
  scoreChart: any;
  preLabel: string= ''

  constructor(private financialDataService: FinancialDataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    if (this.userId) {
      this.loadFinancialData(this.userId);
    }
  }

  loadFinancialData(userId: string): void {
    this.financialDataService.getFinancialDataByUser(userId).subscribe(
      (data: FinancialDataDto[]) => {
        this.financialData = data;
        this.calculateMetrics();
        this.initializeD3GaugeChart();
        this.initializeScoreChart();
      },
      (error) => {
        console.error('Error fetching financial data:', error);
      }
    );
  }

  
  getPredictionLabel(score: number): string {
    this.rating = 1 - score;
    if (this.rating >= 0.875 && this.rating <= 1.0) {
      return 'Highest Credit Quality ';
    } else if (this.rating >= 0.75 && this.rating < 0.875) {
      return 'High Credit Quality ';
    } else if (this.rating >= 0.625 && this.rating < 0.75) {
      return 'Upper-Medium Credit Quality ';
    } else if (this.rating >= 0.5 && this.rating < 0.625) {
      return 'Medium Credit Quality ';
    } else if (this.rating >= 0.375 && this.rating < 0.5) {
      return 'Substantial Credit Risk ';
    } else if (this.rating >= 0.25 && this.rating < 0.375) {
      return 'High Credit Risk ';
    } else if (this.rating >= 0.125 && this.rating < 0.25) {
      return 'Very High Credit Risk ';
    } else if (this.rating >= 0.0 && this.rating < 0.125) {
      return 'In Default ';
    } else {
      return 'Invalid Score';
    }
  }
  // Calculate the rating label based on the score
  getRatingFromScore(score: number): string {
    this.rating = 1 - score;
    if (this.rating >= 0.875 && this.rating <= 1.0) {
      return 'AAA';
    } else if (this.rating >= 0.75 && this.rating < 0.875) {
      return 'AA';
    } else if (this.rating >= 0.625 && this.rating < 0.75) {
      return 'A';
    } else if (this.rating >= 0.5 && this.rating < 0.625) {
      return 'BBB';
    } else if (this.rating >= 0.375 && this.rating < 0.5) {
      return 'BB';
    } else if (this.rating >= 0.25 && this.rating < 0.375) {
      return 'B';
    } else if (this.rating >= 0.125 && this.rating < 0.25) {
      return 'CCC/CC/C';
    } else if (this.rating >= 0.0 && this.rating < 0.125) {
      return 'D';
    } else {
      return 'Invalid Score';
    }
  }

  calculateMetrics(): void {
    if (this.financialData.length > 0) {
      this.totalEntries = this.financialData.length;
  
      // Get the latest entry's score and prediction
      const lastEntry = this.financialData[this.financialData.length - 1];
  
      // Calculate the rating label based on the original score, or adjust this if needed
      this.ratingLabel = this.getRatingFromScore(lastEntry.score); 
      this.preLabel = this.getPredictionLabel(lastEntry.score); 

  
      // Set this.rating for the pointer's calculation (adjusted to use the 1 - score if this is intended)
      this.rating = 1 - lastEntry.score;
  
      // Set the lastPrediction (ensure lastEntry.prediction exists in FinancialDataDto)
      this.lastPrediction = lastEntry.prediction;
  
      // Debugging output to confirm the lastPrediction value
      console.log('lastPrediction:', this.lastPrediction);
    }
  }
  
  


  initializeD3GaugeChart(): void {
    const width = 300, height = 150;
    const minAngle = 90, maxAngle = -90; // Flip the angle range
  
    // Color mapping for each rating range
    const colorMapping = [
      { label: 'D', range: [0.0, 0.125], color: '#ff3300' }, // D (red)
      { label: 'CCC/CC/C', range: [0.125, 0.25], color: '#ff6600' }, // CCC/CC/C
      { label: 'B', range: [0.25, 0.375], color: '#ff9933' }, // B
      { label: 'BB', range: [0.375, 0.5], color: '#ffcc00' }, // BB (orange)
      { label: 'BBB', range: [0.5, 0.625], color: '#cccc00' }, // BBB (yellow)
      { label: 'A', range: [0.625, 0.75], color: '#99cc00' }, // A
      { label: 'AA', range: [0.75, 0.875], color: '#66cc33' }, // AA (light green)
      { label: 'AAA', range: [0.875, 1.0], color: '#00b300' } // AAA (green)
    ];
  
    const svg = d3.select('#d3GaugeChart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height})`);
  
    const arcGenerator = d3.arc<d3.DefaultArcObject>()
      .innerRadius(70)
      .outerRadius(90)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);
  
    const segmentCount = colorMapping.length;
    const segmentAngle = (maxAngle - minAngle) / segmentCount;
  
    // Create gauge segments with fixed colors
    colorMapping.forEach((colorInfo, i) => {
      const arcData: d3.DefaultArcObject = {
        innerRadius: 70,
        outerRadius: 90,
        startAngle: ((minAngle + i * segmentAngle) * Math.PI) / 180,
        endAngle: ((minAngle + (i + 1) * segmentAngle) * Math.PI) / 180,
      };
  
      svg.append('path')
        .datum(arcData)
        .style('fill', colorInfo.color)
        .attr('d', arcGenerator);
    });
  
    // Draw the pointer
    const pointer = svg.append('g')
      .attr('class', 'pointer')
      .attr('transform', `rotate(${minAngle})`);
  
    pointer.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', -70)
      .attr('stroke', 'black')
      .attr('stroke-width', 3);
  
    // Calculate the correct pointer angle based on rating
    const pointerAngle = minAngle + (this.rating ?? 0) * (maxAngle - minAngle);
  
    // Rotate pointer based on calculated pointer angle
    pointer.transition()
      .duration(1000)
      .attr('transform', `rotate(${pointerAngle})`);
  
    // Populate the legend with color labels and ranges
    const legendContainer = d3.select('#gaugeLegend');
    legendContainer.selectAll('div')
      .data(colorMapping)
      .enter()
      .append('div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin', '4px 0')
      .html(d => `
        <span style="width: 16px; height: 16px; background-color: ${d.color}; display: inline-block; margin-right: 8px;"></span>
        <span>${d.label} (${d.range[0]} - ${d.range[1]})</span>
      `);
  }
  
  initializeScoreChart(): void {
    const scores = this.financialData.map(data => data.score);
    const labels = this.financialData.map((_, index) => `Entry ${index + 1}`);

    this.scoreChart = new Chart('scoreChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Score Trend',
            data: scores,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    });
  }
}

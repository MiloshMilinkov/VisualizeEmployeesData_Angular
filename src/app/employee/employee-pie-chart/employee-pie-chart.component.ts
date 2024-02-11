import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { EmployeeService } from '../services/employee.service';
import { EmployeeHours } from 'src/app/shared/models/EmployeHours';

@Component({
  selector: 'app-employee-pie-chart',
  templateUrl: './employee-pie-chart.component.html',
  styleUrls: ['./employee-pie-chart.component.scss']
})
export class EmployeePieChartComponent implements OnInit {

  pieChartLabels: string[] = [];

  pieChartOptions: ChartOptions  = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        enabled: true 
      }
    }
  };
  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ 
      data: []
   }]
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData(): void {
    this.employeeService.getEmployeeHours().subscribe(data => {
      const totalHours = data.reduce((sum: number, current: EmployeeHours) => sum + current.TotalHours, 0);
      const backgroundColors = data.map(() => this.getRandomColor());
      this.pieChartData.labels = data.map(d => `${d.EmployeeName} (${((d.TotalHours / totalHours) * 100).toFixed(2)}%)`);
      this.pieChartData.datasets[0].data = data.map(d => d.TotalHours);
      this.pieChartData.datasets[0].backgroundColor = backgroundColors;
      this.pieChartData.datasets[0].hoverBackgroundColor = backgroundColors;
    });
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  }
  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeePieChartComponent } from './employee-pie-chart/employee-pie-chart.component';
import { NgChartsModule  } from 'ng2-charts';


@NgModule({
  declarations: [
    EmployeeTableComponent,
    EmployeeComponent,
    EmployeePieChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    NgChartsModule
  ]
})
export class EmployeeModule { }

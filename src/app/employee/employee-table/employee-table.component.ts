import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/Employee';
import { EmployeeService } from '../services/employee.service';
import { EmployeeHours } from 'src/app/shared/models/EmployeHours';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit{
  employeeHours: EmployeeHours[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.getEmployeeHours().subscribe( data =>{
      this.employeeHours = data;
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Employee } from 'src/app/shared/models/Employee';
import { EmployeeHours } from 'src/app/shared/models/EmployeHours';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl:string=environment.apiBaseUrl;
  employees: Employee[] = [];

  constructor( private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      catchError(this.handleError<Employee[]>('getEmployees', []))
    )
  }

  getEmployeeHours(): Observable<EmployeeHours[]>{
    return this.getEmployees().pipe(
      map(employees => this.calculateEmployeeHours(employees)),
      catchError(this.handleError<EmployeeHours[]>('getEmployeeHours', []))
    )
  }

  private calculateEmployeeHours(employees: Employee[]){
    const employeeHoursMap: Record<string, EmployeeHours> = {};

    employees.forEach(employee => {
      if (employee.EmployeeName) {
        const totalHours = (new Date(employee.EndTimeUtc).getTime() - new Date(employee.StarTimeUtc).getTime()) / 36e5; // 1000*60*60
        employeeHoursMap[employee.EmployeeName] = employeeHoursMap[employee.EmployeeName] || { EmployeeName: employee.EmployeeName, TotalHours: 0 };
        employeeHoursMap[employee.EmployeeName].TotalHours += totalHours;
      }
    });

    return Object.values(employeeHoursMap);
  }

  private handleError<T>(operation = '', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

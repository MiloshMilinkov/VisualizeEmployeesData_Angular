import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee/employee-table/employee-table.component';
import { EmployeeModule } from './employee/employee.module';

const routes: Routes = [
{
  path:'',
  loadChildren:() => import('./employee/employee.module').then(m=>m.EmployeeModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

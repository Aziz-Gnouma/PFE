import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/Employee'; // Update the path as per your project structure

@Pipe({
  name: 'EmployeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm) {
      return employees;
    }

    searchTerm = searchTerm.toLowerCase(); // Convert searchTerm to lowercase once

    return employees.filter(employee =>
      (employee.userFirstName && employee.userFirstName.toLowerCase().includes(searchTerm)) ||
      (employee.userLastName && employee.userLastName.toLowerCase().includes(searchTerm)) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm)) ||
      (employee.phoneNumber && employee.phoneNumber.toString().includes(searchTerm))
      // Add more properties to filter by if needed
    );
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { User } from './User';
import { Avancement, Employee, Structure, Titularisation } from './Employee';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], searchTerm: string): User[] {
    if (!users || !searchTerm) {
      return users;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return users.filter(user => 
      user.cin.toString().includes(searchTerm) ||
      user.nationality.toLowerCase().includes(searchTerm) ||
      user.userLastName.toLowerCase().includes(searchTerm)
      // Add more fields as needed
    );
  }


}

@Pipe({
  name: 'Avancementilter'
})
export class AvancementilterPipe implements PipeTransform {
  transform(users: Avancement[], searchTerm: string): Avancement[] {
    if (!users || !searchTerm) {
      return users;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return users.filter(user => 
      user.dateAjouter.toString().includes(searchTerm) ||
      user.grade.toLowerCase().includes(searchTerm) ||
      user.categorie.toLowerCase().includes(searchTerm)
      // Add more fields as needed
    );
  }


}

@Pipe({
  name: 'StructureFilter'
})
export class StructureFilterPipe implements PipeTransform {
  transform(users: Structure[], searchTerm: string): Structure[] {
    if (!users || !searchTerm) {
      return users;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return users.filter(user => 
      user.dateAjouter.toString().includes(searchTerm) ||
      user.fonction.toLowerCase().includes(searchTerm) ||
      user.dateAffectation.toString().toLowerCase().includes(searchTerm)      // Add more fields as needed
    );
  }

}

@Pipe({
  name: 'TitularisationFilter'
})
export class TitularisationFilterPipe implements PipeTransform {
  transform(users: Titularisation[], searchTerm: string): Titularisation[] {
    if (!users || !searchTerm) {
      return users;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return users.filter(user => 
      user.dateAjouter.toString().includes(searchTerm) ||
      user.ok.toLowerCase().includes(searchTerm) 
    );
  }


}
@Pipe({
  name: 'EmployeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(Employees: Employee[], searchTerm: string): Employee[] {
    if (!Employees || !searchTerm) {
      return Employees;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return Employees.filter(Employee => 
      Employee.cin.toString().includes(searchTerm) ||
      Employee.userLastName.toLowerCase().includes(searchTerm)
      // Add more fields as needed
    );
  }
}

@Pipe({
  name: 'enterpriseFilter'
})
export class EnterpriseFilterPipe implements PipeTransform {
  transform(users: User[], searchTerm2: string): User[] {
    if (!users || !searchTerm2) {
      return users;
    }
    
    searchTerm2 = searchTerm2.toLowerCase();
    
    return users.filter(user => 
      user.entreprise && user.entreprise.length > 0 && (
        user.entreprise[0].entrepriseName.toLowerCase().includes(searchTerm2) ||
        user.entreprise[0].numFiscale.toLowerCase().includes(searchTerm2)
      )
      // Add more fields as needed
    );
  }
}
@Pipe({
  name: 'ficheDePaieFilter'
})
export class FicheDePaieFilterPipe implements PipeTransform {
  transform(fiches: any[], selecteDate: string): any[] {
    if (!fiches || !selecteDate) {
      return fiches;
    }
    
    // Filter by month and year
    return fiches.filter(fiche => {
      return fiche.dateAjouter.toLowerCase().includes(selecteDate.toLowerCase());
    });
  }
}

@Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {
  transform(users: User[], searchTerm: string, filterByRole: string): User[] {
    if (!users || (!searchTerm && !filterByRole)) {
      return users;
    }
    
    let filteredUsers = users;

    if (filterByRole) {
      const filterByRoleLower = filterByRole.toLowerCase();
      if (filterByRoleLower === 'rh') {
        // Filter users with roles "GRH" or "SGRH"
        filteredUsers = filteredUsers.filter(user =>
          user.role.some(role => ['grh', 'sgrh'].includes(role.roleName.toLowerCase()))
        );
      } else if (filterByRoleLower === 'user') {
        // Filter users excluding roles "GRH", "SGRH", "Gerant", and "Archiver"
        filteredUsers = filteredUsers.filter(user =>
          !['grh', 'sgrh', 'gerant', 'archiver'].includes(user.role[0]?.roleName.toLowerCase())
        );
      }
    }
    

    return filteredUsers;
  }
}
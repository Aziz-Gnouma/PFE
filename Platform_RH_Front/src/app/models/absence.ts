export interface Absence {
  id?: number;
  startDate: string;
  startTime?: string;
  endTime?: string;
  numberOfHours?: number;
  reason: string;
  matricule: string;
  isValidated?: boolean;
  RHMatricule?: string;
  entreprise?: string;
  userFirstName?: string;
  userLastName?: string;
}

export interface Demande {
  entreprise: string;
  RHMatricule: any;
  id: number | null;
  matricule:string;
  dateEnvoi: any;
  dateDebut: any;
  reason: string;
  dateFin: any;
  status?: string;
  cumulative: boolean;
  nombreJoursDemandes: number;
  userFirstName?: string;
  userLastName?: string;
  daysRemaining?: number;
}

export interface Sanction {
  id: number;
  matricule: number;
  entreprise: string;
  dateDemission: Date;
  duree: Date;
  description: string;
  RHmatricule: string | null;
  gravite: string;
  StatutA: string;
  Autorite: string;
  type: string ;
}

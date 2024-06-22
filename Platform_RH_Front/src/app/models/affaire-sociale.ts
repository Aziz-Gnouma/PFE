export interface AffaireSociale {
  id: number;
  status: string;
  situationFamiliale: string;
  matriculeConjoint: string;
  prenomConjoint: string;
  nbEnfants: number;
  nbEnfantsImposables: number;
  chefDeFamille: boolean;
  salaireUnique: boolean;
  allocFamiliale: boolean;
  securiteSociale: string;
  nomAssurance: string;
  affiliationLe: Date;
  exonere: boolean;
  affiliationRegime: boolean;
  affiliationAssurance: boolean;
  affiliationMutuelle: boolean;
  affiliationAssuranceGroupe: boolean;
  affiliationCss: number;
  numeroAffiliationAssurance: number;
  nomMutuelle: string;
  numeroAffiliationMutuelle: number;
}

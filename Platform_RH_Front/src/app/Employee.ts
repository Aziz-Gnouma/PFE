export interface Employee {
    matricule: string;
    phoneNumber: number;
    address: string;
    userFirstName: string;
    userLastName: string;
    dateOfBirth: string; 
    placeOfBirth: string;
    gender: string;
    civility: string;
    cin: number;
    cinDate: string; 
    nationality: string;
    codePostal: string | null;
    pays: string;
    email: string;
    niveauEtude: string | null;
    dateDernierDiplome: string | null;
    typeContrat: string | null;
    typeEmployeur: string | null;
    dateEntree: string | null;
    dateRecrutement: string | null; 
    dateFinEssai: string | null; 
    dateTitularisation: string | null;
    chefFamille: boolean;
    salaireUnique: boolean;
    allocationFamille: boolean;
    numeroSecuriteSociale: string | null;
    dateAffiliation: string | null; 
    exonereeSecuriteSociale: boolean;
    dateDebutExonereeSecuriteSociale: string | null; 
    dateFinExonereeSecuriteSociale: string | null; 
    affiliationAssuranceGroupe: boolean;
    nomAssurance: string | null;
    numeroAffiliationAssurance: string | null;
    dateAffiliationAssurance: string | null;
    affiliationMutuelle: boolean;
    nomMutuelle: string | null;
    numeroAffiliationMutuelle: string | null;
    dateAffiliationMutuelle: string | null; 
    categorie: string | null;
    grade: string | null;
    classe: string | null;
    echelon: string | null;
    dateSituation: string | null; 
    fonction: string | null;
    dateFonction: string | null; 
    structureAttache: string | null;
    dateAffectation: string | null;
    motifDepart: string | null;
    dateDepart: string | null; 
    situation: number;
    grilleSalaire: string | null;
    salaireDeBase: number;
    modeDePaiement: string | null;
    numeroCompte: string | null;
    nomBanque: string | null;
    nomAgence: string | null;
    montantAssurance: number;
    montantMutuelle: number;
    entrepriseName: string;
  }
  export  interface Avancement {
    id_Avancement: number;
    matricule: string;
    categorie: string;
    grade: string;
    classe: string;
    echelon: string;
    dateSituation: Date;
    situation: string;
    dateAjouter: Date;
  }
  
  export interface Structure {
    id_Avancement: number;
    matricule: string;
    fonction: string;
    dateFonction: Date;
    structureAttache: string;
    dateAffectation: Date;
    situation: string;
    dateAjouter: Date;
  }

  export interface Titularisation {
    matricule: string;
    ok: string; 
    situation: string;
    dateAjouter: string;
    id_Titularisation: number;
  }
  
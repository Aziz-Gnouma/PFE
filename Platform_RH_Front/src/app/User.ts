export interface User {
    email: string;
    userFirstName: string;
    userLastName: string;
    cin: number;
    userPassword: string;
    civility: string;
    matricule: number;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    gender: string;
    cinDate: string;
    pays: string;
    phoneNumber: number;
    address: string;
    locality: string;
    private_email: string;
    role: { roleName: string; roleDescription: string }[];
    entreprise: {
      entrepriseName: string;
      entrepriseDescription: string;
      adresse_Entreprise: string;
      ville: string;
      code_Postal: string;
      pays: string;
      tel_Entreprise: string;
      email: string;
      numFiscale: string;
      date_Creation_Entreprise: string;
      domaine_Activite: string;
      nb_Employees: number;
      site_Web: string;
      etat: number;
    }[];
  }
  
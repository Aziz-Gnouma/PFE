import { Demande } from './demande';
import { TypeCongee } from './type-congee';

export interface CongeEntry {
  id: number | null;
  demande: Demande;
  typeCongee: TypeCongee;
  date: Date;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sanction } from '../models/sanction';
import { Reward } from '../models/reward';

@Injectable({
  providedIn: 'root'
})
export class SanctionsRecompencesService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  // Requêtes pour les sanctions
  ajouterSanction(selectedUserId: number, sanction: Sanction): Observable<any> {
    if (selectedUserId) {
      // Set the matricule attribute with the provided Cin
      sanction.matricule = selectedUserId;
      // Use the correct URL for creating a new sanction
      const url = `${this.baseUrl}/sanctions/ajout/${selectedUserId}`;
      return this.http.post<any>(url, sanction);
    } else {
      throw new Error('No user selected');
    }
  }
  getSanctionsByEnterprise(enterprise: string): Observable<Sanction[]> {
    return this.http.get<Sanction[]>(`${this.baseUrl}/sanctions/enterprise/${enterprise}`);
  }

  getSanctionById(id: number): Observable<Sanction> {
    return this.http.get<Sanction>(`${this.baseUrl}/sanctions/${id}`);
  }
  getSanctionsByUserId(userId: number): Observable<Sanction[]> {
    return this.http.get<Sanction[]>(`${this.baseUrl}/sanctions/${userId}`);
  }

  modifierSanction(id: number, sanction: Sanction): Observable<Sanction> {
    return this.http.put<Sanction>(`${this.baseUrl}/sanctions/update/${id}`, sanction);
  }
  listsanctions(): Observable<Sanction[]> {
    return this.http.get<Sanction[]>(`${this.baseUrl}/sanctions/list`);
}
filterrewardsByMatricule(matricule: string): Observable<Reward[]> {
  return this.http.get<Reward[]>(`${this.baseUrl}/api/rewards/matricule/${matricule}`);
}
filterSanctionsByMatricule(matricule: string): Observable<Sanction[]> {
  return this.http.get<Sanction[]>(`${this.baseUrl}/sanctions/matricule/${matricule}`);
}
  // Requêtes pour les récompenses

  addReward(selectedUserId: number, reward: Reward): Observable<Reward> {
    if (selectedUserId) {
      // Set the matricule attribute with the provided Cin
      reward.matricule = selectedUserId;
      const url = `${this.baseUrl}/api/rewards/ajout/${selectedUserId}`;
      return this.http.post<any>(url, reward);
    } else {
      throw new Error('No user selected');
    }
  }

  getRewardById(id: number): Observable<Reward> {
    return this.http.get<Reward>(`${this.baseUrl}/api/rewards/${id}`);
  }
  getRewardsByEnterprise(enterprise: string): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/api/rewards/enterprise/${enterprise}`);
  }
  updateReward(id: number, reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${this.baseUrl}/api/rewards/${id}`, reward);
  }
  listRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/api/rewards/list`);
  }

  getALLtotalSanctions(entrepriseName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sanctions/totalSanctions/${entrepriseName}`);
  }

  getALLtotalRewards(entrepriseName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/api/rewards/totalRewards/${entrepriseName}`);
  }

}

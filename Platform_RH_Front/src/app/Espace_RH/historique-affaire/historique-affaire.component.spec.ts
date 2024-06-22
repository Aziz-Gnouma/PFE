import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAffaireComponent } from './historique-affaire.component';

describe('HistoriqueAffaireComponent', () => {
  let component: HistoriqueAffaireComponent;
  let fixture: ComponentFixture<HistoriqueAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueAffaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

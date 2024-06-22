import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAffaireComponent } from './details-affaire.component';

describe('DetailsAffaireComponent', () => {
  let component: DetailsAffaireComponent;
  let fixture: ComponentFixture<DetailsAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAffaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

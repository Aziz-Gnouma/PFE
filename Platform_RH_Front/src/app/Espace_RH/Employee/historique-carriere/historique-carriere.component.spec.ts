import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCarriereComponent } from './historique-carriere.component';

describe('HistoriqueCarriereComponent', () => {
  let component: HistoriqueCarriereComponent;
  let fixture: ComponentFixture<HistoriqueCarriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCarriereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueCarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueFinanceComponent } from './historique-finance.component';

describe('HistoriqueFinanceComponent', () => {
  let component: HistoriqueFinanceComponent;
  let fixture: ComponentFixture<HistoriqueFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueFinanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesFicheDePaieComponent } from './mes-fiche-de-paie.component';

describe('MesFicheDePaieComponent', () => {
  let component: MesFicheDePaieComponent;
  let fixture: ComponentFixture<MesFicheDePaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesFicheDePaieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesFicheDePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

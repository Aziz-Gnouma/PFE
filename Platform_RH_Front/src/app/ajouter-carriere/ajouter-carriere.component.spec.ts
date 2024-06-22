import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCarriereComponent } from './ajouter-carriere.component';

describe('AjouterCarriereComponent', () => {
  let component: AjouterCarriereComponent;
  let fixture: ComponentFixture<AjouterCarriereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterCarriereComponent]
    });
    fixture = TestBed.createComponent(AjouterCarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

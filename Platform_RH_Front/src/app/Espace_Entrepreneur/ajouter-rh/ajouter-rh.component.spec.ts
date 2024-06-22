import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRhComponent } from './ajouter-rh.component';

describe('AjouterRhComponent', () => {
  let component: AjouterRhComponent;
  let fixture: ComponentFixture<AjouterRhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterRhComponent]
    });
    fixture = TestBed.createComponent(AjouterRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

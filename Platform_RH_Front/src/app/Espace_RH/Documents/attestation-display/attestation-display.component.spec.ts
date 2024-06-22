import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationDisplayComponent } from './attestation-display.component';

describe('AttestationDisplayComponent', () => {
  let component: AttestationDisplayComponent;
  let fixture: ComponentFixture<AttestationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttestationDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttestationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

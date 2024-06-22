import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAbsencesComponent } from './valid-absences.component';

describe('ValidAbsencesComponent', () => {
  let component: ValidAbsencesComponent;
  let fixture: ComponentFixture<ValidAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidAbsencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

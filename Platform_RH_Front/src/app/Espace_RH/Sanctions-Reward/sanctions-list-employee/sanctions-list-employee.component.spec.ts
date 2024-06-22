import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionsListEmployeeComponent } from './sanctions-list-employee.component';

describe('SanctionsListEmployeeComponent', () => {
  let component: SanctionsListEmployeeComponent;
  let fixture: ComponentFixture<SanctionsListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanctionsListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanctionsListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

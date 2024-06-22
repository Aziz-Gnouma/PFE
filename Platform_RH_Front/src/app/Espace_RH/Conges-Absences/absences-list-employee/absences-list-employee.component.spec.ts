import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesListEmployeeComponent } from './absences-list-employee.component';

describe('AbsencesListEmployeeComponent', () => {
  let component: AbsencesListEmployeeComponent;
  let fixture: ComponentFixture<AbsencesListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsencesListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsencesListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

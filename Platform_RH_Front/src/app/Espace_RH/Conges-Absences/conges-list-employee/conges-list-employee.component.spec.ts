import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesListEmployeeComponent } from './conges-list-employee.component';

describe('CongesListEmployeeComponent', () => {
  let component: CongesListEmployeeComponent;
  let fixture: ComponentFixture<CongesListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongesListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongesListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

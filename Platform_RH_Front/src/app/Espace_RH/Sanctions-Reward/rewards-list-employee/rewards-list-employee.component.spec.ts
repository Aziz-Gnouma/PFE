import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListEmployeeComponent } from './rewards-list-employee.component';

describe('RewardsListEmployeeComponent', () => {
  let component: RewardsListEmployeeComponent;
  let fixture: ComponentFixture<RewardsListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardsListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

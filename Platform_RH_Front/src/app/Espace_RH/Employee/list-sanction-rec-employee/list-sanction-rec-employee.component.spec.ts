import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSanctionRecEmployeeComponent } from './list-sanction-rec-employee.component';

describe('ListSanctionRecEmployeeComponent', () => {
  let component: ListSanctionRecEmployeeComponent;
  let fixture: ComponentFixture<ListSanctionRecEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSanctionRecEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSanctionRecEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

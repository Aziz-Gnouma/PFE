import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeSancRecComponent } from './list-employee-sanc-rec.component';

describe('ListEmployeeSancRecComponent', () => {
  let component: ListEmployeeSancRecComponent;
  let fixture: ComponentFixture<ListEmployeeSancRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmployeeSancRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEmployeeSancRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

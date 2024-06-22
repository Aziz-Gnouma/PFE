import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartComponent } from './list-depart.component';

describe('ListDepartComponent', () => {
  let component: ListDepartComponent;
  let fixture: ComponentFixture<ListDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDepartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

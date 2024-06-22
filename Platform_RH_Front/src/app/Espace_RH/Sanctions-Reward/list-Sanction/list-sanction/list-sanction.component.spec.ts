import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSanctionComponent } from './list-sanction.component';

describe('ListSanctionComponent', () => {
  let component: ListSanctionComponent;
  let fixture: ComponentFixture<ListSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSanctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

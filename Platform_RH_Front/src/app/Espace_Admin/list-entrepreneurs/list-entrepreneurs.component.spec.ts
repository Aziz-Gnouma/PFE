import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntrepreneursComponent } from './list-entrepreneurs.component';

describe('ListEntrepreneursComponent', () => {
  let component: ListEntrepreneursComponent;
  let fixture: ComponentFixture<ListEntrepreneursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEntrepreneursComponent]
    });
    fixture = TestBed.createComponent(ListEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

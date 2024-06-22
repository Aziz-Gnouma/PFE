import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInactiveEntrepriseComponent } from './list-inactive-entreprise.component';

describe('ListInactiveEntrepriseComponent', () => {
  let component: ListInactiveEntrepriseComponent;
  let fixture: ComponentFixture<ListInactiveEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInactiveEntrepriseComponent]
    });
    fixture = TestBed.createComponent(ListInactiveEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

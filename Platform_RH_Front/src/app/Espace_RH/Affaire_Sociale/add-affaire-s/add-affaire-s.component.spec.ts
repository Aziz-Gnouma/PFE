import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffaireSComponent } from './add-affaire-s.component';

describe('AddAffaireSComponent', () => {
  let component: AddAffaireSComponent;
  let fixture: ComponentFixture<AddAffaireSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAffaireSComponent]
    });
    fixture = TestBed.createComponent(AddAffaireSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

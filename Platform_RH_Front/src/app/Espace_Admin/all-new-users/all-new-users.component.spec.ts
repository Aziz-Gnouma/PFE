import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewUsersComponent } from './all-new-users.component';

describe('AllNewUsersComponent', () => {
  let component: AllNewUsersComponent;
  let fixture: ComponentFixture<AllNewUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllNewUsersComponent]
    });
    fixture = TestBed.createComponent(AllNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

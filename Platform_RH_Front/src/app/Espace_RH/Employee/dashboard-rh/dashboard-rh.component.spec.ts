import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRHComponent } from './dashboard-rh.component';

describe('DashboardRHComponent', () => {
  let component: DashboardRHComponent;
  let fixture: ComponentFixture<DashboardRHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRHComponent]
    });
    fixture = TestBed.createComponent(DashboardRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

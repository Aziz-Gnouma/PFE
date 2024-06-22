import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEntrepreneurComponent } from './dash-entrepreneur.component';

describe('DashEntrepreneurComponent', () => {
  let component: DashEntrepreneurComponent;
  let fixture: ComponentFixture<DashEntrepreneurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashEntrepreneurComponent]
    });
    fixture = TestBed.createComponent(DashEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

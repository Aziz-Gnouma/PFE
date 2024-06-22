import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDepartComponent } from './espace-depart.component';

describe('EspaceDepartComponent', () => {
  let component: EspaceDepartComponent;
  let fixture: ComponentFixture<EspaceDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceDepartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspaceDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

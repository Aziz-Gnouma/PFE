import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffreEmploiComponent } from './add-offre-emploi.component';

describe('AddOffreEmploiComponent', () => {
  let component: AddOffreEmploiComponent;
  let fixture: ComponentFixture<AddOffreEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOffreEmploiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOffreEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

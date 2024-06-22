import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffreEmploiComponent } from './list-offre-emploi.component';

describe('ListOffreEmploiComponent', () => {
  let component: ListOffreEmploiComponent;
  let fixture: ComponentFixture<ListOffreEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOffreEmploiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOffreEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

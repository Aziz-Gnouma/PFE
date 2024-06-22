import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocAuthComponent } from './details-doc-auth.component';

describe('DetailsDocAuthComponent', () => {
  let component: DetailsDocAuthComponent;
  let fixture: ComponentFixture<DetailsDocAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDocAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDocAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

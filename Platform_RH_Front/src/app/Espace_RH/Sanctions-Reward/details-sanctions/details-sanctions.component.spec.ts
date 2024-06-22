import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSanctionsComponent } from './details-sanctions.component';

describe('DetailsSanctionsComponent', () => {
  let component: DetailsSanctionsComponent;
  let fixture: ComponentFixture<DetailsSanctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSanctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

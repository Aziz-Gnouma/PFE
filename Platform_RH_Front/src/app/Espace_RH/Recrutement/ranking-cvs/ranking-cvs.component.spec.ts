import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCvsComponent } from './ranking-cvs.component';

describe('RankingCvsComponent', () => {
  let component: RankingCvsComponent;
  let fixture: ComponentFixture<RankingCvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingCvsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingCvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

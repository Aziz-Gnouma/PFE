import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRewardsComponent } from './details-rewards.component';

describe('DetailsRewardsComponent', () => {
  let component: DetailsRewardsComponent;
  let fixture: ComponentFixture<DetailsRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRewardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

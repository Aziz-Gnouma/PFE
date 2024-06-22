import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOffreRhComponent } from './post-offre-rh.component';

describe('PostOffreRhComponent', () => {
  let component: PostOffreRhComponent;
  let fixture: ComponentFixture<PostOffreRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOffreRhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOffreRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

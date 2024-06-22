import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAuthentiqueComponent } from './doc-authentique.component';

describe('DocAuthentiqueComponent', () => {
  let component: DocAuthentiqueComponent;
  let fixture: ComponentFixture<DocAuthentiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAuthentiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocAuthentiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

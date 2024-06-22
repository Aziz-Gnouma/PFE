import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentInfoComponent } from './app-document-info.component';

describe('AppDocumentInfoComponent', () => {
  let component: AppDocumentInfoComponent;
  let fixture: ComponentFixture<AppDocumentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDocumentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

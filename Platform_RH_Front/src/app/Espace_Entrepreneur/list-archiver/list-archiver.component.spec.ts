import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchiverComponent } from './list-archiver.component';

describe('ListArchiverComponent', () => {
  let component: ListArchiverComponent;
  let fixture: ComponentFixture<ListArchiverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArchiverComponent]
    });
    fixture = TestBed.createComponent(ListArchiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

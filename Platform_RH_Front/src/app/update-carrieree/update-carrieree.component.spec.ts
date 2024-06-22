import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarriereeComponent } from './update-carrieree.component';

describe('UpdateCarriereeComponent', () => {
  let component: UpdateCarriereeComponent;
  let fixture: ComponentFixture<UpdateCarriereeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCarriereeComponent]
    });
    fixture = TestBed.createComponent(UpdateCarriereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

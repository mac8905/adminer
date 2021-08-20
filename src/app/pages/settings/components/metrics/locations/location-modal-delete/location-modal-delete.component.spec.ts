import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModalDeleteComponent } from './location-modal-delete.component';

describe('LocationModalDeleteComponent', () => {
  let component: LocationModalDeleteComponent;
  let fixture: ComponentFixture<LocationModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

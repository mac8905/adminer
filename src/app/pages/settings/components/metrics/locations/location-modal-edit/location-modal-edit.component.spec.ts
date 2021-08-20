import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModalEditComponent } from './location-modal-edit.component';

describe('LocationModalEditComponent', () => {
  let component: LocationModalEditComponent;
  let fixture: ComponentFixture<LocationModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

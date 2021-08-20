import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModalCreateComponent } from './location-modal-create.component';

describe('LocationModalCreateComponent', () => {
  let component: LocationModalCreateComponent;
  let fixture: ComponentFixture<LocationModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

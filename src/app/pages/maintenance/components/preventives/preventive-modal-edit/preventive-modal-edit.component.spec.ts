import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveModalEditComponent } from './preventive-modal-edit.component';

describe('PreventiveModalEditComponent', () => {
  let component: PreventiveModalEditComponent;
  let fixture: ComponentFixture<PreventiveModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventiveModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveModalDeleteComponent } from './preventive-modal-delete.component';

describe('PreventiveModalDeleteComponent', () => {
  let component: PreventiveModalDeleteComponent;
  let fixture: ComponentFixture<PreventiveModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventiveModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

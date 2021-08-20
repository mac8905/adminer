import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveModalCreateComponent } from './preventive-modal-create.component';

describe('PreventiveModalCreateComponent', () => {
  let component: PreventiveModalCreateComponent;
  let fixture: ComponentFixture<PreventiveModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventiveModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

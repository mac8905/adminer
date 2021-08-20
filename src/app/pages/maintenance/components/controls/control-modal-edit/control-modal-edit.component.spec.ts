import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlModalEditComponent } from './control-modal-edit.component';

describe('ControlModalEditComponent', () => {
  let component: ControlModalEditComponent;
  let fixture: ComponentFixture<ControlModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

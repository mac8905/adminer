import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlModalDeleteComponent } from './control-modal-delete.component';

describe('ControlModalDeleteComponent', () => {
  let component: ControlModalDeleteComponent;
  let fixture: ComponentFixture<ControlModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

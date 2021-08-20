import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlModalCreateComponent } from './control-modal-create.component';

describe('ControlModalCreateComponent', () => {
  let component: ControlModalCreateComponent;
  let fixture: ComponentFixture<ControlModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

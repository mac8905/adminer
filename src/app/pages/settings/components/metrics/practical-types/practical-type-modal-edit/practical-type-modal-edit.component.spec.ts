import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalTypeModalEditComponent } from './practical-type-modal-edit.component';

describe('PracticalTypeModalEditComponent', () => {
  let component: PracticalTypeModalEditComponent;
  let fixture: ComponentFixture<PracticalTypeModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalTypeModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalTypeModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

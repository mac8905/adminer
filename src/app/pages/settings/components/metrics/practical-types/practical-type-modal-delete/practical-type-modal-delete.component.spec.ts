import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalTypeModalDeleteComponent } from './practical-type-modal-delete.component';

describe('PracticalTypeModalDeleteComponent', () => {
  let component: PracticalTypeModalDeleteComponent;
  let fixture: ComponentFixture<PracticalTypeModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalTypeModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalTypeModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

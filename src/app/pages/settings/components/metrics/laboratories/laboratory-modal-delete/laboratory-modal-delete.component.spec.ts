import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryModalDeleteComponent } from './laboratory-modal-delete.component';

describe('LaboratoryModalDeleteComponent', () => {
  let component: LaboratoryModalDeleteComponent;
  let fixture: ComponentFixture<LaboratoryModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

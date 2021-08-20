import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryModalEditComponent } from './laboratory-modal-edit.component';

describe('LaboratoryModalEditComponent', () => {
  let component: LaboratoryModalEditComponent;
  let fixture: ComponentFixture<LaboratoryModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
